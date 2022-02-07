---
title: "Openssl"
description: "Useful openssl commands"
tags: ["openssl", "certificates", "keys"]
weight: 2
---

## Fetch certificate from a server
```sh
openssl s_client -showcerts -servername <server hostname> -connect <server hostname>:443 </dev/null
```
{{% expand Example %}}
- Example
    ```sh
    openssl s_client -showcerts -servername 'google.com' -connect 'google.com:443' </dev/null
    ```
{{% / expand %}}

## Create

### Create a Self Signed Root CA

1. Create key pair
    ```sh
    openssl genrsa -des3 -out <key file>.key 2048
    # or
    openssl ecparam -out <key file>.key -name prime256v1 -genkey
    ```
2. Create CSR
    ```sh
    openssl req -new -sha256 -key <key file>.key -out <csr file>.csr
    ```
3. Sign CSR
    ```sh
    openssl x509 -req -sha256 -days 365 -in <csr file>.csr -signkey <key file>.key -out <certificate file>.crt
    ```

### Create Self Signed Certificate

1. Create key pair
    ```sh
    openssl genrsa -des3 -out <key file>.key 2048
    # or
    openssl ecparam -out <key file>.key -name prime256v1 -genkey
    ```
2. Create CSR
    ```sh
    openssl req -key <key file>.key -new -out <csr file>.csr
    ```
3. Sign CSR
    ```sh
    openssl x509 -signkey <key file>.key -in <csr file>.csr -req -days 365 -out <certificate file>.crt
    ```

### Request a certificate from Self Signed Root CA

1. Create key pair
    ```sh
    openssl genrsa -des3 -out <key file>.key 2048
    # or
    openssl ecparam -out <key file>.key -name prime256v1 -genkey
    ```
2. Create CSR
    ```sh
    openssl req -key <key file>.key -new -out <csr file>.csr
    ```
3. Sign CSR
    ```sh
    openssl x509 -req -in <csr file>.csr -CA  <ca certificate file>.crt -CAkey <ca key file>.key -CAcreateserial -out <certificate file>.crt -days 365 -sha256
    ```

## View or Print

### Print a Certificate
```sh
openssl x509 -text -noout -in <certificate file>.crt
```

### Print a CSR
```sh
openssl req -in <csr file>.csr -text -noout
```

## Convert

### PEM to DER/CRT
```sh
openssl x509 -in <certificate file>.pem -outform der -out <certificate file>.(crt|der)
```

### DER/CRT to PEM
```sh
openssl x509 -inform der -in <certificate file>.(crt|der) -outform pem -out <certificate file>.pem
```

### PEM to PKCS12/P12/PFX
```sh
openssl pkcs12 -inkey <key file>.key -in <certificate file>.crt -export -out <pkcs12 file>.(p12|pfx)
```
