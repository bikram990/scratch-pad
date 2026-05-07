---
title: Redis
description: "Useful redis commands"
tags: ["redis"]
weight: 1
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## Redis

### Connect

```sh
redis-cli -h <hostname> -p <port> -a <password>
```

### Get value for a key

```js
GET <key>
```

### Set a value

```js
SET "<key>" "<value>"
```

### Delete a Key

```js
DEL "<key>"
```

### Get value for a key before deleting it

```js
GETDEL "<key>"
```

### Check if key is present

```js
EXISTS "<key>"
```

### Get all keys with prefix

```js
KEYS "<prefix>*"
```
