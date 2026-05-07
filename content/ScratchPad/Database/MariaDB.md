---
title: MariaDB/mysql
description: "Useful mysql commands"
tags: ["mariadb", "mysql"]
weight: 1
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

### Set Id of last insert into variable

```sql
SET @variable_name = LAST_INSERT_ID();
```

### Set a value into variable from select

```sql
SELECT ID INTO @variable_name FROM `DATABASE`.`TABLE` WHERE NAME = "test";
```

#### Turn off safe update mode

```sql
SET SQL_SAFE_UPDATES = 0;
```

### Users

#### List Users

```sql
SELECT User FROM mysql.user;
```

#### Change password

```sql
SET PASSWORD FOR 'bob'@localhost = PASSWORD("newpass");
-- or
SET PASSWORD FOR 'bob'@'%' = PASSWORD("newpass");
-- or
SET PASSWORD FOR 'bob'@'%.hostname' = PASSWORD('newpass');
```

### [Maxwell](https://github.com/zendesk/maxwell) / Bin logs
