---
title: MongoDB
description: "Useful mongodb commands"
tags: ["mongo"]
weight: 1
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## MongoDB

### Connect

```bash
mongo -u <user> -p <password> localhost:9005/admin
# or
mongo --host localhost --port 9005 -u <user> -p --authenticationDatabase <authentication db>
```

### Server Version

```js
db.version();
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
db.createUser({
  user: "<username>",
  pwd: "<password>",
  roles: [{ role: "readWrite", db: "<auth db name>" }],
});
```

#### Delete a user in specific db

```js
use <database>;
db.dropUser("<username>");
```

### Update

#### Update Many

```js
db.getCollection("<collection name>").updateMany({<field name>: { $exists: <should exist> }}, { $set : {"somefield": {"param1": 1, "param2": "value"} } });
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

// Greater than equal to
db.getCollection('<collection name>').find({<field name> : {$gte : new Date(new Date() - 30 * 60 * 60 * 24 * 1000)}});
```

#### Distinct

```js
db.getCollection('<collection name>').distinct("<field>", {<query>});
```

#### Undefined

```js
db.getCollection("<collection name>").find({<field>: {$type: 'undefined'}});
```

### Arrays

```js
// checks size equals
db.getCollection("<collection name>").find({ "<field>": { $size: 1 } });

// doesn't work
db.getCollection("<collection name>").find({
  $where: "this.<field>.length >= 1",
});

// works and checks if an element exists at index 1
db.getCollection("<collection name>").find({ "<field>.1": { $exists: true } });

// key inside array of object
db.getCollection("<collection name>").find({"<field>": {$elemMatch: {"<key in object>": "<value>"}}}).sort({_id: -1});
```

### Key inside an object

```js
db.getCollection("<collection name>")
  .find({ "<field>.<key>": "<my exp>" })
  .limit(1);
```

### Complex

```js
db.getCollection("envelope").aggregate([
  {
    $match: {
      customerId: 12003,
      requestName: "Incentive Scheme 2022.pdf",
      recipients: {
        $in: ["s.alharrasi@glemedical.com", "m.aljahwari@glemedical.com"],
      },
    },
  }, // filter documents
  {
    $project: {
      _id: 1,
      sentOn: 1,
      recipients: { $arrayElemAt: ["$recipients", 0] },
      documentFields: { $arrayElemAt: ["$documentFields", 0] },
    },
  }, // pick first element in array, project can filter fields, transform fields and much more
  {
    $project: {
      _id: 1,
      sentOn: 1,
      recipients: 1,
      documentFields: "$documentFields.fields.textFields",
    },
  }, // pick textFields
  {
    $project: {
      _id: 0,
      sentOn: 1,
      recipients: 1,
      documentFields: {
        $map: {
          input: "$documentFields",
          as: "item",
          in: { k: "$$item.fieldName", v: "$$item.fieldValue" },
        },
      },
    },
  },
]);
```

### [Kafka Connector](https://www.mongodb.com/products/integrations/kafka-connector)

