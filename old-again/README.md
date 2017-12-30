# CSP vs `iframe` `sandbox`es

The purpose of this repo was to quickly test how CSP and `iframe`s interact. I wanted to know the final precedence.

<!-- MarkdownTOC -->

- [Conclusions](#conclusions)
- [Background](#background)
- [Usage](#usage)
    - [With JavaScript](#withjavascript)
    - [With Docker](#withdocker)

<!-- /MarkdownTOC -->


## Conclusions

The CSP header sets a baseline for allowed `sandbox` options. The `iframe` attribute can then pick and choose from that list, but cannot use anything not already in the CSP header.

* If you have dexterity over the headers and know specific content will be embedded, you should set the header.
* If you're embedding content, you should set the attribute.
* If you're doing both, set both.

## Background

* [`Content-Security-Policy` headers](https://content-security-policy.com/)
* [CSP `sandbox` from MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/sandbox)
* [`iframe` `sandbox` attribute from MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox)

## Usage

```sh-session
$ git clone https://github.com/wizardsoftheweb/csp-iframe-sandbox-comparison
Cloning into 'csp-iframe-sandbox-comparison'...
remote: Counting objects: 303, done.
remote: Compressing objects: 100% (126/126), done.
remote: Total 303 (delta 188), reused 290 (delta 176), pack-reused 0
Receiving objects: 100% (303/303), 44.84 KiB | 0 bytes/s, done.
Resolving deltas: 100% (188/188), done.
Checking connectivity... done.
$ cd csp-iframe-sandbox-comparison
$ yarn install
yarn install v1.3.2
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 27.43s.
```

### With JavaScript

```sh-session
$ npm start
> csp-iframe-sandbox-comparison@0.4.0 start /mnt/c/Users/thecj/Code/@wizardsoftheweb/csp-sandbox-example
> node server.js

Example app listening on port 9001!
```

### With Docker

```sh-session
$ docker-compose up [-d]
Creating network "cspsandboxexample_default" with the default driver
Pulling js (node:8-alpine)...
8-alpine: Pulling from library/node
1160f4abea84: Pull complete
66ff3f133e43: Pull complete
4c8ff6f0a4db: Pull complete
Digest: sha256:40201c973cf40708f06205b22067f952dd46a29cecb7a74b873ce303ad0d11a5
Status: Downloaded newer image for node:8-alpine
Creating csp-iframe-sandbox-comparison ...
Creating csp-iframe-sandbox-comparison ... done
Attaching to csp-iframe-sandbox-comparison
csp-iframe-sandbox-comparison |
csp-iframe-sandbox-comparison | > csp-iframe-sandbox-comparison@0.4.0 start /usr/src/app
csp-iframe-sandbox-comparison | > node server.js
csp-iframe-sandbox-comparison |
csp-iframe-sandbox-comparison | Example app listening on port 9001!
```
