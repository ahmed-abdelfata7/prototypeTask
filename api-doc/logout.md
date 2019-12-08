#### Logout API

---

- REST Name: api/v1/logout
- Request Method: GET
- Request Header:

| name  | value      |
| ----- | ---------- |
| token | tokenValue |

- Success Response:

```
{
"success": true,
"data": "Logged out successfully"
}

```

- Failure Response:

```
{
"success": false,
"errors": [
"Missed Token"
]
}

```
