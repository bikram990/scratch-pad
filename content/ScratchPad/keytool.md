---
title: "Keytool"
description: "Useful keytool commands"
tags: ["keytool", "certificates", "keys"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "keytool certificate keys"
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
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

### Import/Convert a keystore into another
```sh
keytool -importkeystore  -srckeystore <src>.jks -destkeystore <dest>.p12 -deststoretype pkcs12
```

### Create a PKCS12 bag without a private key
```sh
keytool -import -file <cert>.crt -alias <alias for cert> -keystore <p12 cert file>.p12 -storetype PKCS12
```
