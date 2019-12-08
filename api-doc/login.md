#### Login API

---

- REST Name: api/v1/login
- Request Method: POST

- Request parameters:

| name     | description | Mandatory? | default | allowed values | data type |
| -------- | ----------- | ---------- | ------- | -------------- | --------- |
| email    | user email  | Yes        | N/A     | string         | string    |
| password | password    | Yes        | N/A     | string         | string    |

- Success Response:

```
{
    "success": true,
    "data": {
        "token": "1411b251-0949-468b-84e5-9ef3a530f39a"
    }
}
```

- Failure Response:

```
{
"success": false,
"errors": [
"authentication error check your credentials!"
]
}
```
