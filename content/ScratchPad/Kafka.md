---
title: "Kafka"
description: "Useful keytool commands"
tags: ["kafka", "zookeeper", "events"]
weight: 1
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---


## List all topics

```sh
./bin/kafka-topics.sh --list --bootstrap-server=localhost:9092

# or

./bin/kafka-topics.sh --list --zookeeper localhost:2181
```

## List all consumer groups

```sh
.bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
```
