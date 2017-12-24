# CSP vs `iframe` `sandbox`es

The purpose of this repo was to quickly test how CSP and `iframe`s interact. I wanted to know the final precedence.

<!-- MarkdownTOC -->

- [Conclusions](#conclusions)
- [Background](#background)
- [Usage](#usage)
    - [With PHP](#withphp)
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
$ git clone <repo>
$ cd csp-sandbox-example
```

### With PHP

```sh-session
$ php -S 0.0.0.0:9001 -t .
PHP 7.0.22-0ubuntu0.16.04.1 Development Server started at Sun Dec 24 11:21:30 2017
Listening on http://0.0.0.0:9001
Document root is /path/to/csp-sandbox-example
Press Ctrl-C to quit.
```

### With Docker

```sh-session
$ docker-compose up [-d]
Creating network "cspsandboxexample_default" with the default driver
Pulling php (php:7.0-cli)...
7.0-cli: Pulling from library/php
f49cf87b52c1: Pull complete
185616061386: Pull complete
4330d62fa9e0: Pull complete
457292eacdcc: Pull complete
f9ccca1b837e: Pull complete
af8f0a0a4cca: Pull complete
27d70e5a324f: Pull complete
456cff3934fb: Pull complete
Digest: sha256:5c0e0d94d39dd4ddaf1e6b3602a205db0522f64a4aab03aad8321790a5649772
Status: Downloaded newer image for php:7.0-cli
Creating csp-sandbox-example ...
Creating csp-sandbox-example ... done
Attaching to csp-sandbox-example
```
