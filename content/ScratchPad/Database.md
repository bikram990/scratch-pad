---
title: Database
description: "Useful Database commands"
tags: ["mariadb", "mysql", "mongo"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "SQL mariadb mysql mongo"
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## MariaDB

### Connect

```sh
mysql --host=<hostname> --user=<username> --password=<password> <database name>
# or
mysql -h <hostname> -u <username> -p<passowrd> <database name>
```

{{% notice note %}}
`-p<passowrd>` is intentional, there should not be any space in `-p` and your password
{{% / notice %}}

### Show all the tables in a database

```sql
SHOW TABLES;
```

### Show columns from a table

```sql
SHOW COLUMNS FROM <table name>;
```

### Run a script

```sh
mysql -h <hostname> -u <user> -p < /path/to/myscript.sql
```

### Slow running queries log file

```sql
SHOW GLOBAL VARIABLES LIKE 'slow%log%';
```

### Show Open Connections and processes

```sql
SHOW PROCESSLIST;
```

### Check if error logs are enabled

```sql
SHOW GLOBAL VARIABLES LIKE 'log_error';
```

### Show slow running queries

```sql
SELECT * FROM mysql.slow_log\G;
```

### Show threshold time for slow running queries

```sql
SHOW GLOBAL VARIABLES LIKE 'long_query_time';
```

### Show where slow running queries are logged

```sql
-- FILE means it will go to file
SHOW GLOBAL VARIABLES LIKE 'log_output';
```

## MongoDB

### Connect

```js
mongo -u <user> -p <password> localhost:9005/admin
// or
mongo --host localhost --port 9005 -u <user> -p --authenticationDatabase <authentication db>
```

Check [this](https://www.shellhacks.com/mongodb-remote-connection-command-line-mongo-shell/) for more flavors

### Database

#### Create

```js
use <database name>;
db.createCollection("mycollection")
```
{{% notice note %}}
`use` command will either create a DB or switch to the DB.
DB creation is saved/visible only after a collection is created.
{{% / notice %}}

#### Show existing Databases

```js
show dbs;
```

#### Change/Switch selected Database

```js
use <database name>;
```

{{% notice note %}}
`use` command will either create a DB or switch to the DB.
{{% / notice %}}

#### To show all the collections in selected Database

```js
show collections;
```

### Users

#### Show users in a DB

```js
use <database>;
db.getUsers();
```

#### Show all system users

```js
use admin;
db.system.users.find();
```

#### Create User in specific db

```js
db.createUser({ user: "<username>", pwd: "<password>", roles: [ {role: "readWrite", db: "<auth db name>"} ] });
```

#### Delete a user in specific db
```js
use <database>;
db.dropUser("<username>");
```

### Filter documents

#### Based on a field's exists 

```js
use <database>;
db.getCollection('<collection name>').find({<field name>: { $exists: <should exist> }});
```

#### Based on regex

```js
use <database>;
db.getCollection('<collection name>').find({<field name>: { $regex: "<my regex>" }});
```

#### Based on equality

```js
use <database>;
db.getCollection('<collection name>').find({<field name>: { $eq: "<my exp>" }});
// or
db.getCollection('<collection name>').find({<field name>: "<my exp>" });

// Greater than
db.getCollection('<collection name>').find({<field name>: { $gt: "<my exp>" }});

//Less than
db.getCollection('<collection name>').find({<field name>: { $lt: "<my exp>" }});
```

