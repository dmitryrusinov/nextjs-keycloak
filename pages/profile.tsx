import {useKeycloak} from '@react-keycloak/ssr'
import type {KeycloakInstance, KeycloakTokenParsed} from 'keycloak-js'
import type {GetStaticProps, NextPage} from 'next'
import * as React from 'react'

import {Layout} from '../components/Layout'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

type ParsedToken = KeycloakTokenParsed & {
    email?: string

    preferred_username?: string

    given_name?: string

    family_name?: string
}

const Field = ({label, value}: {label: string; value: string}) => (<li>
        <span className="font-weight-bold mr-1">{label}:</span>
        <span className="text-muted">{value}</span>
    </li>)


const ProfilePage: NextPage = () => {
    const {keycloak} = useKeycloak<KeycloakInstance>()
    const {t} = useTranslation('profile')
    const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed

    const profile = keycloak?.authenticated ? (
        <ul>
            <Field label={t('mail')} value={parsedToken?.email ?? ''}/>
            <Field label={t('username')} value={parsedToken?.preferred_username ?? ''}/>
            <Field label={t('first_name')} value={parsedToken?.given_name ?? ''}/>
            <Field label={t('last_name')} value={parsedToken?.family_name ?? ''}/>
        </ul>
    ) : (
        <span>{t('CTA')}</span>
    )

    return (
        <Layout title={t('title')}>
            <h1 className="my-5">{t('header')}</h1>
            {profile}
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (context) => ({
    props: {
        ...(await serverSideTranslations(context?.locale || '', ['profile', 'common']))
    }
})

export default ProfilePage
