# Text Analyzer API

A simple NestJS-based REST API for analyzing and managing text entries. This tool supports CRUD operations and provides
insights like word count, character count, sentence/paragraph analysis, and longest words per paragraph.

---

## Tech Stack

- NodeJS()
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)

## Prerequisites

Make sure you have the following installed:

- **Node.js**: `v22.16.0`
- **pnpm**: `10.12.1`
- **Docker**

```shell
node -v
pnpm -v
````

## Project setup

Clone the repository

```shell
$ git clone https://github.com/abidmuin/text-analyzer.git
```

Copy the `.env.example` file to `.env`

```shell
$ cp .env.example .env
```

Setup PostgreSQL local database using docker

```shell
$ docker compose up -d
```

If **pnpm** is not available then try installing it with the following command

```shell
$ npm install -g pnpm
```

Install project dependencies

```bash
$ pnpm install
```

If any dependencies require running any scripts, run the following command and allow the dependencies to run their
scripts.

```shell
$ pnpm approve-builds
```

Run database migrations

```shell
$ npx prisma migrate dev
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## API Documentation

You can access the API documentation at [http://localhost:3000/api](http://localhost:3000/api)
