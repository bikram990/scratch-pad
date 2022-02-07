---
title: "SSH"
description: "Useful ssh commands"
tags: ["ssh"]
weight: 4
---

## Generate SSh key
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

## Copy my public key
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

