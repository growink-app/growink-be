# Growink Backend Repository

## About

Growink App is a website with a mobile web base which aims to make it easier for farmers to make agricultural records, view agricultural history, and monitor their agriculture, apart from that there is a financial feature which aims to record their expenses and income and can see the history of their expenses and income and can also see their balance

This backend application for Growink APP is developed using Nest.js framework and Prisma as the ORM.

## Backend Links

- API = https://growink-api.up.railway.app/
- Swagger = https://growink-api.up.railway.app/docs

## Tech Stacks

- Prisma ORM
- Node.js
- Nest.js Framework
- Railway

## Contributors

- Indra Setiadhi (Lead Backend Developer)

- Gary Cruise (Backend Developer)

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your environment variables following the `.env.example` file.

## Usage

To start the application, run:

```bash
npm run start
```

## Endpoints

**Authentication**

| Method | Endpoint         | Description         | Auth |
| :----- | :--------------- | :------------------ | ---- |
| 'POST' | '/auth/register' | Register a new user |      |
| 'POST' | '/auth/login'    | Login user          |      |

**User**

| Method  | Endpoint   | Description        | Auth |
| :------ | :--------- | :----------------- | ---- |
| 'GET'   | '/user/me' | Get user profile   | 🔑   |
| 'PATCH' | '/user/me' | Patch user profile | 🔑   |

**Products**

| Method | Endpoint           | Description      | Auth |
| :----- | :----------------- | :--------------- | ---- |
| 'GET'  | '/yields/products' | Get all Products |      |

**Yields**

| Method   | Endpoint                            | Description                     | Auth |
| :------- | :---------------------------------- | :------------------------------ | ---- |
| 'GET'    | '/yields '                          | Get all Yields                  | 🔑   |
| 'POST'   | '/yields '                          | Post a new Yields               | 🔑   |
| 'GET'    | '/yields/statistic '                | Get all Yield Statistic         | 🔑   |
| 'GET'    | '/yields/statistic/{year}/{month} ' | Get Yield based on year & month | 🔑   |
| 'GET'    | '/yields/{id} '                     | GET Yields by id                | 🔑   |
| 'PATCH'  | '/yields/{id} '                     | PATCH Yields                    | 🔑   |
| 'DELETE' | '/yields/{id} '                     | Delete Yields                   | 🔑   |

**Transactions**

| Method   | Endpoint            | Description              | Auth |
| :------- | :------------------ | :----------------------- | ---- |
| 'GET'    | '/transaction '     | Get Transaction Category |      |
| 'GET'    | '/transaction'      | Get all Transaction      | 🔑   |
| 'POST'   | '/transaction '     | Post a new Transaction   | 🔑   |
| 'GET'    | '/transaction/{id}' | GET Transaction by id    | 🔑   |
| 'PATCH'  | '/transaction/{id}' | Update Transaction       | 🔑   |
| 'DELETE' | '/transaction/{id}' | Delete Transaction       | 🔑   |
