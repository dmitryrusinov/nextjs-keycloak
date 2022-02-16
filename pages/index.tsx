import {useKeycloak} from '@react-keycloak/ssr'
import type {KeycloakInstance, KeycloakTokenParsed} from 'keycloak-js'
import {Layout} from '../components/Layout'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {GetStaticProps, NextPage} from "next";

type ParsedToken = KeycloakTokenParsed & {
    email?: string

    preferred_username?: string

    given_name?: string

    family_name?: string
}

const IndexPage: NextPage = () => {
    const {keycloak} = useKeycloak<KeycloakInstance>()
    const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed
    const {t} = useTranslation('common')
    const loggedinState = keycloak?.authenticated ? (
        <span className="text-success">{t('logged-in')}</span>
    ) : (
        <span className="text-danger">{t('logged-out')}</span>
    )

    const welcomeMessage =
        keycloak?.authenticated || (keycloak && parsedToken)
            ? t("welcome-logged", {userName: parsedToken?.preferred_username ?? ''})
            : t("welcome-anon")

    return (
        <Layout title={t('h1')}>
            <h1 className="mt-5">{t('h1')}</h1>
            <div className="mb-5 lead text-muted">
                {t('h2')}
            </div>

            <p> {t('you-are')}: {loggedinState}</p>
            <p>{welcomeMessage}</p>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (context) => ({
    props: {
        ...(await serverSideTranslations(context?.locale || '', ['common']))
    }
})

export default IndexPage
