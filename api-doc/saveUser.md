#### SaveUser API

---

- REST Name: api/v1/users/save
- Request Method: POST
- Request Header:

| name  | value      |
| ----- | ---------- |
| token | tokenValue |

- Request parameters:

| name     | description | Mandatory? | default | allowed values | data type |
| -------- | ----------- | ---------- | ------- | -------------- | --------- |
| name     | username    | Yes        | N/A     | string         | string    |
| email    | user email  | Yes        | N/A     | string         | string    |
| password | password    | Yes        | N/A     | string         | string    |

- Success Response:

```
{
    "success": true,
    "data": {
        "id": "5decaba60a23b14632998e1a",
        "name": "ahmed",
        "email": "ahmed@ahmed.com"
    }
}
```

- Failure Response:

```
{
    "success": false,
    "errors": [
        "Email already exist!"
    ]
}

```
