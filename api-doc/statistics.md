#### statistics API

---

- REST Name: api/v1/statistics
- Request Method: GET
- Request Header:

| name  | value      |
| ----- | ---------- |
| token | tokenValue |

- Success Response:
  ```
  {
  "success": true,
  "data": {
  "openingCrawl": "A New Hope",
  "personAppeared": "Obi-Wan Kenobi",
  "mostSpeciesAppeared": "requirement not clear",
  "plantWithPilots": "requirement not clear"
  }
  }
  ```

- Failure Response:

```
  {
  "success": false,
  "errors": [
  "db not contains star war schema"
  ]
  }
  ```
