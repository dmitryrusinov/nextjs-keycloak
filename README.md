# TypeScript Next.js Keycloak i18next example


## How to use it?

```
cp .env.local.example .env.local
```
Edit your `.env.local` file

Get dependencies and start app dev mode
```
yarn
#
yarn dev
```

See `@react-keycloak/ssr` package [README](https://github.com/react-keycloak/react-keycloak/blob/master/packages/ssr/README.md) for complete documentation.


Also `@isaachinman/next-i18next` package [README](https://github.com/isaachinman/next-i18next/blob/master/README.md).

## Docker
For Docker deployment, note that if you use the Dockerfile from Next.js docs do not forget to copy next.config.js and next-i18next.config.js into the Docker image.
```
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
```
## Deploy

Don't forget assign values this variables
```
NEXT_PUBLIC_KEYCLOAK_URL
NEXT_PUBLIC_KEYCLOAK_REALM
NEXT_PUBLIC_KEYCLOAK_ID
```
