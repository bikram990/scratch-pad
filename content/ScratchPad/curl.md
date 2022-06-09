---
title: "cURL"
description: "Useful cURL commands"
tags: ["curl", "doh"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "curl doh"
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## Use DNS over https with cURL

```sh
curl --doh-url https://dns.google/dns-query https://api.ipify.org
```

{{% notice note %}}
The above command will override the DNS server while quering `api.ipify.org`, but it will still use your system DNS to query for `dns.google`

You can view list of DNS servers [here](https://kb.adguard.com/en/general/dns-providers).
{{% / notice %}}
