import cookie from 'cookie'
import * as React from 'react'
import type {IncomingMessage} from 'http'
import type {AppProps, AppContext} from 'next/app'

import {SSRKeycloakProvider, SSRCookies} from '@react-keycloak/ssr'
import {appWithTranslation} from 'next-i18next'

const keycloakCfg = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "",
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "",
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_ID || "",
}

interface InitialProps {
    cookies: unknown
}


const MyApp = ({
                   Component,
                   pageProps,
                   cookies
               }: AppProps & InitialProps) => {

    return (
        <SSRKeycloakProvider
            keycloakConfig={keycloakCfg}
            persistor={SSRCookies(cookies)}
        >
            <Component {...pageProps} />
        </SSRKeycloakProvider>
    )
}

function parseCookies(req?: IncomingMessage) {
    if (!req || !req.headers) {
        return {}
    }
    return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async ({Component, ctx}: AppContext) => {
    let pageProps = {}
    if (Component?.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }
    return {
        // Extract cookies from AppContext
        cookies: parseCookies(ctx?.req),
        pageProps
    }
}

export default appWithTranslation(MyApp)
