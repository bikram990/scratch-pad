---
title: "Openssl"
description: "Openssl commands: fetch server certificate, create self signed certificates, print certificate/csr details, convert certificates into different formats and more"
tags: ["openssl", "certificates", "key", "pem", "der", "p12", "pfx"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "openssl certificate pem der p12 pfx key"
enable_twitter_meta: true
image: https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/OpenSSL_logo.svg/469px-OpenSSL_logo.svg.png
enable_opengraph_meta: true
---

## Fetch Server SSL certificate

We need to trust a SSL certificate before we can communicate with a SSL server. To download the SSL certificate we can use following command:

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

### Self Signed Root CA Certificate

1. Create key pair for creating certificate
    ```sh
    openssl genrsa -des3 -out <key file>.key 2048
    # or
    openssl ecparam -out <key file>.key -name prime256v1 -genkey
    ```
2. Create [CSR](https://en.wikipedia.org/wiki/Certificate_signing_request)
    ```sh
    openssl req -new -sha256 -key <key file>.key -out <csr file>.csr
    ```
3. Sign [CSR](https://en.wikipedia.org/wiki/Certificate_signing_request)
    ```sh
    openssl x509 -req -sha256 -days 365 -in <csr file>.csr -signkey <key file>.key -out <certificate file>.crt
    ```

### Self Signed Certificate

1. Create key pair
    ```sh
    openssl genrsa -des3 -out <key file>.key 2048
    # or
    openssl ecparam -out <key file>.key -name prime256v1 -genkey
    ```
2. Create [CSR](https://en.wikipedia.org/wiki/Certificate_signing_request)
    ```sh
    openssl req -key <key file>.key -new -out <csr file>.csr
    ```
3. Sign [CSR](https://en.wikipedia.org/wiki/Certificate_signing_request)
    ```sh
    openssl x509 -signkey <key file>.key -in <csr file>.csr -req -days 365 -out <certificate file>.crt
    ```

### Certificate from Self Signed Root CA

1. Create key pair
    ```sh
    openssl genrsa -des3 -out <key file>.key 2048
    # or
    openssl ecparam -out <key file>.key -name prime256v1 -genkey
    ```
2. Create [CSR](https://en.wikipedia.org/wiki/Certificate_signing_request)
    ```sh
    openssl req -key <key file>.key -new -out <csr file>.csr
    ```
3. Sign [CSR](https://en.wikipedia.org/wiki/Certificate_signing_request)
    ```sh
    openssl x509 -req -in <csr file>.csr -CA  <ca certificate file>.crt -CAkey <ca key file>.key -CAcreateserial -out <certificate file>.crt -days 365 -sha256
    ```

### Certificate with Subject Alternate Name

1. Create a conf file
    ```sh
    [req]
    default_bits = 2048
    prompt = no
    default_md = sha256
    x509_extensions = v3_req
    req_extensions = v3_req
    distinguished_name = dn

    [dn]
    C = Country
    ST = State
    L = Example Location
    O = Example Org
    OU = Example Org Unit
    CN = example.com

    [v3_req]
    subjectAltName = @alt_names
    keyUsage = critical, digitalSignature, nonRepudiation
    extendedKeyUsage = 2.16.840.1.114027.40.11, 1.3.6.1.4.1.311.10.3.12

    # 2.16.840.1.114027.40.11 is Entrust Technologies oid
    # 1.3.6.1.4.1.311.10.3.12 is Identified Private Org oid

    [alt_names]
    DNS.1 = *.example.com
    IP.1 = 10.10.10.100
    ```

    {{% notice tip %}}
- Add more DNS names or IPs to the config file as per your requirement, just increment the number in `DNS.<num>`
- All these entries will be added to SubjectAltNames extension
- Check [here](https://www.openssl.org/docs/manmaster/man5/config.html) for more fields in conf file
    {{% / notice %}}

2. Create Self Signed Cert using above config

    ```sh
    openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout <key file>.key -days 3560 -out <certificate file>.pem -config <path to config file>.cnf
    ```

    {{% notice note %}}
- Above command will create a new key
- Fields for CSR will be taken from the conf file
    {{% / notice %}}

## View or Print

### Certificate

```sh
openssl x509 -text -noout -in <certificate file>.crt
```

### CSR

```sh
openssl req -in <csr file>.csr -text -noout
```

### P12

```sh
openssl pkcs12 -info -in <p12 file>.(p12|pfx)
```

## Convert

### PEM certificate to DER/CRT format
```sh
openssl x509 -in <certificate file>.pem -outform der -out <certificate file>.(crt|der)
```

### DER/CRT certificate to PEM format
```sh
openssl x509 -inform der -in <certificate file>.(crt|der) -outform pem -out <certificate file>.pem
```

### PEM certificate and key to PKCS12/P12/PFX bag
```sh
openssl pkcs12 -inkey <key file>.key -in <certificate file>.crt -export -out <pkcs12 file>.(p12|pfx) -name <alias or key name>
```
