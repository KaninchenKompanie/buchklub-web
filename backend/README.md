python 3.11.9

Windows:
py -m venv .venv
.venv\Scripts\activate
Linux:
python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt

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