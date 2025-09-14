# Personnel Register API

A simple REST API built with node.js, typescript, express and SQLite for managing employees.

## Tech Stack
- Node.js
- Typescript
- Express
- Zod
- Jest
- SQLite
##### Database
* In memory DB by default
* File based DB can be enabled in `db.ts`

## Getting Started

1. Clone the repo
    ```bash
    git clone https://github.com/Moo000000/personnelRegister.git
    ```

2.  Move into the repo
    ```bash
    cd personnelRegister
    ```

3.  Install dependencies
    ```bash
    npm i 
    ```

4.  Start the server (localhost:8080)
    ```bash
    npm run dev
    ```

5.  To run tests
    ```bash
    npm run test
    ```

## **API Documentation**

### Add Employee
`POST /employees`

Request Body example:
```json
{
    "email": "moo@blahonga.com",
    "name": "Moo",
    "lastName": "Habib"
}
```

Response Body example:
```json
{
    "id": 1,
    "email": "moo@blahonga.com",
    "name": "Moo",
    "lastName": "Habib"
}
```

### Delete Employee
`DELETE /employees`

Request Body example:
```json
{
    "email": "moo@blahonga.com",
}
```

### Fetch Employees
`GET /employees`

