This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and [`material-ui`](https://mui.com/) for UI Design.

### Libraries included

- [`material-ui`](https://mui.com/)
- [`axios`](https://www.npmjs.com/package/axios)
- [`redux toolkit`](https://redux-toolkit.js.org/)
- [`redux persist`](https://github.com/rt2zz/redux-persist)
- [`date-fns`](https://date-fns.org/)

### Running application (via Docker)

First, install docker

https://www.docker.com/products/docker-desktop/

Turn on docker and run this command from the root folder

```bash
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Shutting down docker

```bash
docker-compose down
```

### Running application (Non Docker)

First, install node_modules:

```bash
yarn
```

Then, run the development server:

```bash
yarn dev
```

NOTE: The API that I`ve used already exceeded todays quota
