python 3.11.9

Windows:
py -m venv .venv
.venv\Scripts\activate
Linux:
python3 -m venv .venv
source .venv/bin/activate

pip install -e .

start server:
fastapi dev src/api/main.py

https://github.com/tiangolo/fastapi
# database
## installation
1. install postgresql 14 from somewhere here: https://www.postgresql.org/

2. use the postgres user to create a user with your login name
   ```
   su -u postgres psql
   CREATE USER <your-name> CREATEDB
   ```

3. create the db `createdb buchklub-db`
4. login to your db `psql -d buchklub-db`

5. install headers: ubuntu `sudo apt-get install libpython3.11-dev libpq-dev`
6. install 

## General structure
The contents of the API go into the `api` dir. There every entity is separated into directories with at least three files:

`view.py` dictates the FastAPI endpoints

`crud.py` dictates the interaction with the db through the ORM of SQLModel

`model.py` holds the SQLModel model definitions

## Apply a migration

to apply a database migration: `alembic revision --autogenerate -m "<message>"`