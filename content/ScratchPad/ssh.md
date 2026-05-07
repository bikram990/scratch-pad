---
title: "SSH"
description: "Useful ssh commands"
tags: ["ssh", "ssh-keygen", "ssh-copy-id"]
weight: 1
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## Generate SSH key

```sh
ssh-keygen -t <type> -C <comment>
```

{{% expand Example%}}

```sh
ssh-keygen -t ed25519 -C "john@users.noreply.github.com"
# or
ssh-keygen -t rsa -C "My key name"
```

{{% / expand %}}

## Copy my public key to authenticate with target machine using my private key

```sh
ssh-copy-id -i <path to key file> <user>@<hostname or ip>
```

{{% expand Example%}}

```sh
ssh-copy-id -i ~/.ssh/id_rsa john@10.10.10.1
# or
ssh-copy-id -i ~/.ssh/id_rsa john@mydomainname.tld
```

{{% / expand %}}

## Login

### Default Login

```sh
ssh <user>@<hostname or ip>
```

{{% expand Example%}}

```sh
ssh john@10.10.10.1
# or
ssh john@mydomainname.tld
```

{{% / expand %}}

### Login with specific key

```sh
ssh john@10.10.10.1 -i ~/.ssh/id_ed25519
```

### Force Password Authentication

```sh
ssh -o PubkeyAuthentication=no -o PreferredAuthentications=password john@10.10.10.1
```

## Add ssh key to OpenSSH authentication agent

```sh
ssh-add ~/.ssh/id_ed25519
```

{{% expand Example%}}

```sh
ssh-add ~/.ssh/id_ed25519
# or
ssh-add ~/.ssh/id_ed25519 ~/.ssh/id_rsa
```

{{% / expand %}}

{{% notice tip %}}
You can use `ssh-add` to handle ssh authentications from the docker containers on you machine without exposing actual keys to the container from your host.
{{% / notice %}}
