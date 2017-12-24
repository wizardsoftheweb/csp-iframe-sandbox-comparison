
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
