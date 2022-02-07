---
title: "Miscellaneous"
description: "Miscellaneous useful commands"
tags: ["dns-sd", "ping", "nslookup", "netstat"]
weight: 10000
---

## Monitor ipv4 address for a hostname using macOS DNS resolver
```sh
dns-sd -G v4 <hostname>
```

## Ping a host given number of times
```sh
ping -c <number> <hostname>
```

## Query IP address of a hostname
```sh
nslookup <hostname>
```

## Query IP address of a hostname from a specific DNS server
```sh
nslookup <hostname> <dns server address>
```
{{% expand Example %}}
```sh
nslookup google.com 8.8.8.8
```
{{% / expand %}}

## Query specific field from DNS server
```sh
nslookup -query=<field name> <hostname>
```
{{% expand Example %}}
```sh
nslookup -query=cname google.com 8.8.8.8
```
{{% / expand %}}

## Find open ports

### Linux
```sh
netstat -plant
```

### macOS
* Using `netstat`
    ```sh
    netstat -an -p<protocol>
    ```
    {{% expand Example %}}
```sh
netstat -an -ptcp
# or
netstat -an -pudp
```
    {{% / expand %}}

* Using `lsof`
    ```sh
    lsof -i
    ```
