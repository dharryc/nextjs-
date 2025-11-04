from fastapi import FastAPI
import sqlite3

con = sqlite3.connect('storage.db')
cur = con.cursor()
cur.execute('''CREATE TABLE IF NOT EXISTS names
               (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)''')
con.commit()

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/name")
async def create_name(name: str):
    cur.execute("INSERT INTO names (name) VALUES (?)", (name,))
    con.commit()
    return {"message": f"Name '{name}' added successfully."}

@app.get("/names")
async def get_names():
    cur.execute("SELECT * FROM names")
    rows = cur.fetchall()
    names = [{"id": row[0], "name": row[1]} for row in rows]
    return {"names": names}