import {useKeycloak} from '@react-keycloak/ssr'
import type {KeycloakInstance} from 'keycloak-js'
import Link from 'next/link'
import * as React from 'react'
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

export const Header: React.FC = () => {
    const {keycloak} = useKeycloak<KeycloakInstance>()
    const router = useRouter()
    const {t} = useTranslation('common')
    return (
        <header
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <Link href="/">
                <a className="my-0 mr-md-auto font-weight-bold text-dark">
                    Next.js + Keycloak
                </a>
            </Link>
            <nav className="my-2 my-md-0 mr-md-3">
                <Link href="/profile">
                    <a className="p-2 text-dark">{t('nav-profile')}</a>
                </Link>
            </nav>


            {keycloak?.authenticated ? (
                <>
                    <button
                        type="button"
                        className="mx-2 btn btn-outline-primary"
                        onClick={() => {
                            if (keycloak) {
                                window.location.href = keycloak.createAccountUrl()
                            }
                        }}
                    >
                        {t('account-button')}
                    </button>

                    <button
                        type="button"
                        className="mx-2 btn btn-outline-danger"
                        onClick={() => {
                            if (keycloak) {
                                window.location.href = keycloak.createLogoutUrl()
                            }
                        }}
                    >
                        {t('logout-button')}
                    </button>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className="mx-2 btn btn-outline-primary"
                        onClick={() => {
                            if (keycloak) {
                                window.location.href = keycloak.createRegisterUrl()
                            }
                        }}
                    >
                        {t('signup-button')}
                    </button>

                    <button
                        type="button"
                        className="mx-2 btn btn-outline-success"
                        onClick={() => {
                            if (keycloak) {
                                window.location.href = keycloak.createLoginUrl()
                            }
                        }}
                    >
                        {t('login-button')}
                    </button>
                </>
            )}
            <Link
                href='/'
                locale={router.locale === 'en' ? 'ru' : 'en'}
            >
                <button
                    type="button"
                    className="mx-2 btn btn-outline-warning"
                >
                    {t('locale-button')}
                </button>
            </Link>
        </header>
    )
}
