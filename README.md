# Basic Fact Checker

A platform where users can post facts or news, and others can vote on their authenticity.

[Live URL](https://basic-fact-checker.onrender.com)

> Warning: the app might load slow due to render.com or the database might be missing due to render not supporting sqlite databases for too long

## Running the project locally

- clone the repo

```bash
git clone https://github.com/sparrowsl/basic-fact-checker.git

# change directory
cd basic-fact-checker
```

- install dependencies

```bash
npm i
```

> create a `.env` file and copy the contents of `.env.example` into it.

- setup database and base project

```bash
npm run setup
```

- run the project

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
