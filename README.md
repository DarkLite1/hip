# HC IT Portal (hip)

A front-end website for end users where they can easily request IT services and start automated tasks like scripts.

## Install the dependencies

```bash
yarn global add @quasar/cli
yarn
```

### Start the app in development mode

```bash
yarn dev
```

### Generate code from the graphql schema

1. Add a valid token to the `./token.txt` file
2. Run the GraphQL code generator

```bash
yarn graphql-codegen
```

### Build the app for production

```bash
quasar build
```
