---
title: "Miscellaneous"
description: "Miscellaneous useful commands"
tags: ["dns-sd", "ping", "nslookup", "netstat", "rsync"]
weight: 99999999
Victor_Hugo: true
Focus_Keyword: "dns-sd ping nslookup netstat rsync"
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
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

## Sync/Copy items with a progress bar
```sh
rsync -azP --delete --exclude="unwanted-*" <source>/ <destination>/
# or
rsync -azP --delete --exclude="more-unwanted-*" <user>@<ip address>:<source>/ <destination>/
```

{{% notice note %}}
- Note the `/` at the end of source and destination, this indicates that the content of that directory is to be synced. If there is not `/` at end then `rsync` will create the source directory under destination
- `--delete` will make sure any file deleted in source is also deleted in destination, by default `rsync` doesn't delete the deleted files
{{% / notice %}}

{{% expand Example %}}
- Following command will create a `dir` directory under `pwd`
    ```sh
    rsync -azP /path/to/dir .
    ```
- Following command will copy contents of `dir` to `pwd`
    ```sh
    rsync -azP /path/to/dir ./
    ```
{{% / expand %}}


## Mount nfs filesystem

```sh
# List all the shares
showmount -e <hostname or ip>

# mount a share
sudo mount -t nfs -o resvport,rw <hostname or ip>:<Path to share> <Path to mount>
```
