---
title: "Ansible"
description: "Useful ansible commands"
tags: ["ansible", "ansible-galaxy", "ansible-playbook", "sops"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "ansible playbook secrets"
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## Install requirements
```sh
ansible-galaxy collection install --requirements-file requirements.yaml
ansible-galaxy roles install --requirements-file requirements.yaml
```

## Ping

### All Nodes

```sh
ansible all -m ping
```

### A group of Nodes

```sh
ansible <group name> -m ping
```

## Run

### A Playbook

```sh
ansible-playbook <path to playbook>.yml
```

### Playbook with SOPS encrypted secrets

```sh
SOPS_AGE_KEY_FILE=<path to age key file> ansible-playbook <path to playbook>.yml
```

## Secrets

### Create a Secret
```sh
age-keygen > <path to age key file>
```
{{% expand Sample age key file%}}
```sh
# created: 2022-02-11T09:41:54+05:30
# public key: age1pqa839xsu7rgdmghchjgexue7fpa985fskpdqr4yq84xc4r0zuysk855k9
AGE-SECRET-KEY-17KP5RAUU7PE00X2CGLXJ63DSZLTC4E3YP6L7CQT0M72PS60QDN6QU4RVK6
```
{{% / expand %}}

### Create/View a sops encrypted file

```sh
SOPS_AGE_KEY_FILE=<path to age key file> sops --age <public age key> <path to secrets>.sops.yml
```
