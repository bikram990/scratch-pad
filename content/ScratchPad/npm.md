---
title: NPM
description: "Useful NPM Snippets and commands"
tags: ["npm", "axios", "webpack", "nvm", "yarn"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "npm yarn webpack"
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## NPM

### Build a project and serve it

```sh
npm serve
```

### Add and Install a NPM package

```sh
npm install --save <package name>
```

## NVM

### Install nvm

Follow instructions given [here](https://github.com/nvm-sh/nvm)

### Install a npm version

```sh
nvm install v10.24.1
```

### Use a npm version

```sh
nvm use 15.14.0
```

## Yarn

### Install project dependencies

```sh
yarn install
```

### Build

```sh
yarn build
```

### Serve NPM project

```sh
yarn serve
```

### Serve NPM project at specific port

```sh
PORT=<port number> yarn serve
```

## Axios

### Print request & response on browser console

1. Add Axios debug package
    ```sh
    npm install --save axios-debug-log
    ```

2. Add interceptors before making the API call
    ```js
    axios.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
    })

    axios.interceptors.response.use(response => {
        console.log('Response:', JSON.stringify(response, null, 2))
        return response
    })
    axios
      .get(path, { withCredentials: true, headers })
      .then((response) => { handleCallback(response, callback) })
      .catch(fail)
    ```

## Webpack

### Define a Proxy server

Check more details [here](https://webpack.js.org/configuration/dev-server/)

```js
module.exports = {
    devServer: {
    // Paths
    proxy: {
      '/path1': {
        target: 'https://example.org',
        changeOrigin: true
      },
      '/path2': {
        target: 'https://example.org',
        changeOrigin: true
      },
      '/path3': {
        target: 'https://example.org',
        changeOrigin: true,
        onProxyReq: function (proxyReq, req, res) {
          console.log(proxyReq.path)
        },
        onProxyRes: function (proxyReq, req, res) {
          console.log(proxyReq.path)
        }
      }
    }
  }
}
```
