---
title: "Java/Spring"
description: "Java or Spring quick reference and links"
tags: ["spring", "java"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "java spring"
enable_twitter_meta: true
image: https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/OpenSSL_logo.svg/469px-OpenSSL_logo.svg.png
enable_opengraph_meta: true
---

- `@RequestParam` Object [binding](http://dolszewski.com/spring/how-to-bind-requestparam-to-object/)
- To enable details in health API

    ```properties
    management.endpoint.health.show-details=always
    ```

- To switch profile

    1. Via command line

        ```sh
        --spring.profiles.active=dev
        ```

    2. Via environment variable

        ```sh
        spring_profiles_active=dev
        ```

- Java heap dump

    ```sh
    sudo su <user running the java process>
    jmap -dump:live,format=b,file=/tmp/<file>.hprof <pid>
    ```

- Get Mime Type in Java

    ```html
    https://www.baeldung.com/java-file-mime-type
    ```
