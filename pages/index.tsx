import {useKeycloak} from '@react-keycloak/ssr'
import type {KeycloakInstance, KeycloakTokenParsed} from 'keycloak-js'
import Link from 'next/link'
import {Layout} from '../components/Layout'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

type ParsedToken = KeycloakTokenParsed & {
    email?: string

    preferred_username?: string

    given_name?: string

    family_name?: string
}

const IndexPage = () => {
    const {keycloak} = useKeycloak<KeycloakInstance>()
    const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed
    const router = useRouter()
    const {t} = useTranslation('common')
    const loggedinState = keycloak?.authenticated ? (
        <span className="text-success">logged in</span>
    ) : (
        <span className="text-danger">NOT logged in</span>
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
            <Link
                href='/'
                locale={router.locale === 'en' ? 'ru' : 'en'}
            >
                <button>
                    {t('locale-button')}
                </button>
            </Link>
            <p> {t('you-are')}: {loggedinState}</p>
            <p>{welcomeMessage}</p>
        </Layout>
    )
}

export const getStaticProps = async ({locale}: { locale: string; }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
})

export default IndexPage
