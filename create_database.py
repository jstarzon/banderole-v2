import psycopg2

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="backend",
    user="postgres",
    password="kupa22"
)

# Create a cursor object to execute SQL statements
cursor = conn.cursor()

# SQL statement for creating the table
create_table_sql = """
CREATE TABLE banderole (
    id SERIAL PRIMARY KEY,
    datetime TIMESTAMP,
    wtok INTEGER,
    pobrane INTEGER,
    tacka INTEGER,
    reszta INTEGER,
    produkcja INTEGER,
    arkusze INTEGER,
    niepelneark INTEGER,
    niepelnepal INTEGER,
    jakosc INTEGER,
    maszyna INTEGER,
    inne INTEGER,
    tok INTEGER,
    banderole INTEGER
)
"""

# Execute the SQL statement
cursor.execute(create_table_sql)

# Commit the changes to the database
conn.commit()

# Close the cursor and database connection
cursor.close()
conn.close()
