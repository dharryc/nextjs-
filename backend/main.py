import jwt
from pydantic import BaseModel
from pwdlib import PasswordHash
from models.card import CardDTO
from models.user import UserDTO
import sqlite3, hashlib, random, string
from jwt.exceptions import InvalidTokenError
from typing import Annotated, List, Annotated
from datetime import datetime, timedelta, timezone
from fastapi import Depends, FastAPI, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$wagCPXjifgvUFBzq4hqe3w$CYaIb8sB+wtD+Vu/P4uod1+Qof8h+1g7bbDlBID48Rc",
        "disabled": False,
    }
}


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str


password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

sha256_hash = hashlib.sha256()
con = sqlite3.connect('storage.db', check_same_thread=False)
con.row_factory = sqlite3.Row
cur = con.cursor()
with open('init.sql', 'r') as f:
    sql_script = f.read()
con.executescript(sql_script)
con.commit()
def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choices(characters, k=length))
    return random_string

app = FastAPI()

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_hash.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]


@app.post("/add_card/", response_model=None)
async def add_card(card: CardDTO):
    cur.execute("INSERT INTO card (card_name, path_to_image, blurb, card_rarity) VALUES (?, ?, ?, ?)",
                (card.card_name, card.path_to_image, card.blurb, card.card_rarity))
    con.commit()
    return {"message": f"Card '{card.card_name}' added successfully."}

@app.get("/cards/", response_model=List[CardDTO])
async def get_cards():
    cur.execute("SELECT id, card_name, path_to_image, blurb, card_rarity FROM card")
    rows = cur.fetchall()
    cards = [
        CardDTO(
            id=row["id"],
            card_name=row["card_name"],
            path_to_image=row["path_to_image"],
            blurb=row["blurb"],
            card_rarity=row["card_rarity"],
        )
        for row in rows
    ]
    return cards

@app.post("/new_user/")
async def new_user(user: UserDTO):
    salt = generate_random_string(50)
    hashed_password = hashlib.sha256(user.unhashed_password.encode('utf-8') + salt.encode('utf-8')).hexdigest()
    cur.execute("INSERT INTO user (username, hashed_password, salt) VALUES (?, ?, ?)",
                (user.username, hashed_password, salt))
    con.commit()
    return {"message": f"User '{user.username}' created successfully."}

@app.get("/users/")
async def get_users():  
    cur.execute("SELECT id, username, hashed_password, salt FROM user")
    rows = cur.fetchall()
    users = [
        {
            "id": row["id"],
            "username": row["username"],
            "hashed_password": row["hashed_password"],
            "salt": row["salt"],
        }
        for row in rows
    ]
    return users

@app.post("/card_inventory")
async def card_inventory(user_id: int, card_id: int):
    cur.execute("INSERT INTO inventory_card (user_id, card_id) VALUES (?, ?)", (user_id, card_id))
    con.commit()
    return {"message": f"Card ID '{card_id}' added to User ID '{user_id}' inventory."}

@app.get("/card_inventory/{user_id}")
async def get_card_inventory(user_id: int):
    cur.execute("""
        SELECT c.id, c.card_name, c.path_to_image, c.blurb, c.card_rarity
        FROM card c
        JOIN inventory_card ic ON c.id = ic.card_id
        WHERE ic.user_id = ?
    """, (user_id,))
    rows = cur.fetchall()
    cards = [
        CardDTO(
            id=row["id"],
            card_name=row["card_name"],
            path_to_image=row["path_to_image"],
            blurb=row["blurb"],
            card_rarity=row["card_rarity"],
        )
        for row in rows
    ]
    return cards
