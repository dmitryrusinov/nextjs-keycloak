import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js'
import type { NextPage } from 'next'
import * as React from 'react'

import { Layout } from '../components/Layout'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

type ParsedToken = KeycloakTokenParsed & {
  email?: string

  preferred_username?: string

  given_name?: string

  family_name?: string
}

const ProfilePage: NextPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
    const {t} = useTranslation('profile')
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed

  const profile = keycloak?.authenticated ? (
    <ul>
      <li>
        <span className="font-weight-bold mr-1">{t('mail')}:</span>
        <span className="text-muted">{parsedToken?.email ?? ''}</span>
      </li>
      <li>
        <span className="font-weight-bold mr-1">{t('username')}:</span>
        <span className="text-muted">
          {parsedToken?.preferred_username ?? ''}
        </span>
      </li>
      <li>
        <span className="font-weight-bold mr-1">{t('first_name')}:</span>
        <span className="text-muted">{parsedToken?.given_name ?? ''}</span>
      </li>
      <li>
        <span className="font-weight-bold mr-1">{t('last_name')}:</span>
        <span className="text-muted">{parsedToken?.family_name ?? ''}</span>
      </li>
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

export const getStaticProps = async ({locale}: { locale: string; }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['profile']))
    }
})

export default ProfilePage
