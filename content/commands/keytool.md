---
title: "Keytool"
description: "Useful keytool commands"
tags: ["keytool", "certificates", "keys"]
weight: 3
---

## List

### List all items from a keystore
```sh
keytool -list -noprompt -storepass <keystore password> -keystore <path to keystore>
```

{{% expand Example %}}
- Example
    ```sh
    keytool -list -noprompt -storepass 'changeit' -keystore '/etc/pki/java/cacerts'
    ```
{{% / expand %}}

### List a particular item from a keystore
```sh
keytool -list -noprompt -alias <alias of the item> -storepass <keystore password> -keystore <path to keystore>
```

{{% expand Example %}}
- Example
    ```sh
    keytool -list -noprompt -alias 'globalsignrootr46' -storepass 'changeit' -keystore '/etc/pki/java/cacerts' -v
    ```
{{% / expand %}}

## Import

### Import a trust certificate
```sh
keytool -import -trustcacerts -keystore <path to keystore> -storepass <keystore password> -noprompt -alias <alias for item> -file <certificate file>
```
{{% expand Example %}}
- Example
    ```sh
    keytool -import -trustcacerts -keystore '/etc/pki/java/cacerts' -storepass 'changeit' -noprompt -alias 'mycert' -file 'cert.pem'
    ```
{{% / expand %}}
