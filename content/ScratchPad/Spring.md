---
title: "Spring"
description: "Spring quick reference and links"
tags: ["spring"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "spring"
enable_twitter_meta: true
image: https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/OpenSSL_logo.svg/469px-OpenSSL_logo.svg.png
enable_opengraph_meta: true
---

http://dolszewski.com/spring/how-to-bind-requestparam-to-object/

- To enable details in health API
```properties
management.endpoint.health.show-details=always
```

- To switch profile
    - Via command line

    ```sh
    --spring.profiles.active=dev
    ```

    - Via environment variable

    ```sh
    spring_profiles_active=dev
    ```
