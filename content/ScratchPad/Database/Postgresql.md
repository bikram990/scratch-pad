---
title: Postgres
description: "Useful Postgres commands"
tags: ["postgres", "psql"]
weight: 1
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## Postgresql

### Connect

```bash
psql postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB
# or 
psql postgresql://postgres:$POSTGRES_POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB
```

### Database

#### Create Database

```sql
CREATE DATABASE <database name>;
```

#### Delete Database

```sql
DROP DATABASE <database name>;
```

#### List Databases

```sql
\l
```

#### Switch

```sql
\c <database name>
```

#### List tables in selected database

```sql
\dt
```

### User Management

#### Create User

```sql
CREATE USER <username> WITH PASSWORD '<password>';
```

#### List Users

```sql
\du
```
