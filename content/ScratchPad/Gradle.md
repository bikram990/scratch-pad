---
title: "Gradle"
description: "Useful gradle commands"
tags: ["gradle"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "build test"
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## Log test events

```groovy
test {
	testLogging {
		events "PASSED", "SKIPPED", "FAILED", "STANDARD_OUT", "STANDARD_ERROR"
	}
}
```