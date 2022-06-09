---
title: "Hugo"
description: "Useful hugo commands"
tags: ["hugo"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "hugo theme site"
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## Create

### Create a new site

```sh
hugo new site <site name>
```

{{% notice info %}}
Above command will create a new folder with given `site name` and all of the directory hierarchy will be created there
{{% / notice %}}

### Create a theme

```sh
hugo new theme <theme name>
```

### Create a page from template

```sh
hugo new --kind <template name stored in archetypes> <where to create under content dir>
```

{{% expand Example %}}
- for directory structure is like following
    ```
    - archetypes
        - _default.md
        - first_template.md
        - second_template.md
        - group_template
            - _index.md
            - third_template.md
    - content
        - posts
            - index.md
            - first
        - blogs
            - index.md
    - ...
    ```
- use `hugo new --kind group_template posts/second` to create all the subtemplates under new post `second`
- use `hugo new --kind first_template blogs/first` to create `first.md` under `blogs`
- use `hugo new --kind chapter intro` to create a new `chapter` under `content`, chapter is a special kind and it will use `_default.md` as bas template if available

{{% / expand %}}

## Serve

```sh
hugo serve
# or
hugo serve --port 8081
```

{{% notice info %}}
`hugo serve` will choose a random port, watch for command output for exact port
{{% / notice %}}

### Serve and Debug

```sh
hugo serve --debug --port 8081
```

## Build

```sh
hugo
```
