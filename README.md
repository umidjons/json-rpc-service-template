# Dummy JSON-RPC project

This repository is a starting point for your projects.

## Getting started

Install dependencies:

```bash
cd sample-json-rpc-core
yarn install
```

Run watcher:

```bash
yarn dev
```

## Request/response example

Request:

```bash
curl -X POST \
  http://127.0.0.1:4455/ \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "method": "users.hello",
    "params": {
        "name": "Neo"
    }
}'
```

Response:

```json
{
    "jsonrpc": "2.0",
    "result": "Hello Neo"
}
```