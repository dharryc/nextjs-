from pydantic import BaseModel
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated

class UserDTO(BaseModel):
    username: str
    unhashed_password: str
    
class User(BaseModel):
    id: int
    username: str
    hashed_password: str
    salt: str