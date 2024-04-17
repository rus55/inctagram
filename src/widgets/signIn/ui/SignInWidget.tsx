import { FC, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

import { SignInAuth } from '../signInAuth/SignInAuth'

import styles from './SignInWidget.module.scss'

import { useLoginMutation } from '@/entities/auth'
import { AUTH_URLS } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'
import { Button } from '@/shared/components'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { useClient } from '@/shared/lib/hooks/useClient'
import { IAuthInput } from '@/shared/types'

export const SignInWidget: FC = () => {
  const [socialsLoading, setSocialsLoading] = useState(false)

  const {
    register: registerInput,
    handleSubmit,
    formState,
    getValues,
    setError,
    trigger,
  } = useForm<IAuthInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })
  const { isClient } = useClient()
  const { t } = useTranslation()
  const [Login, { isLoading, error, isSuccess }] = useLoginMutation()

  const router = useRouter()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    Login({ email: data.email, password: data.password })
  }

  const login = (url: string) => {
    setSocialsLoading(true)
    window.location.assign(url)
  }

  useEffect(() => {
    isSuccess && router.push('/my-profile')
  }, [isSuccess])

  useEffect(() => {
    error &&
      setError('password', {
        type: 'server',
        message: t.signin.error_message,
      })
  }, [error])

  useEffect(() => {
    isClient && trigger()
  }, [t.signin.error_message])

  useFetchLoader(isLoading || socialsLoading)

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{t.signin.title}</h1>
      <div className={styles.icon}>
        <Button variant="link" onClick={() => login(AUTH_URLS.GOOGLE)}>
          <GoogleIcon />
        </Button>
        <Button variant="link" onClick={() => login(AUTH_URLS.GITHUB)}>
          <GithubIcon className="fill-light-100" />
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <SignInAuth formState={formState} register={registerInput} getValues={getValues} />

        <div className="mt-9 mb-6 text-end">
          <Link href={'/auth/forgot-password'} className="text-sm text-light-900 ">
            {t.signin.forgot_password}
          </Link>
        </div>

        <button
          type="submit"
          className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded my-4 disabled:opacity-75"
          disabled={!formState.isValid}
        >
          {t.signin.sign_in}
        </button>
        <div className="font-base text-light-100 text-center">{t.signin.account_question}</div>
        <div className="text-center mt-3">
          <Link
            href={'/signup'}
            className="font-semibold text-primary-500 p-4 bg-transparent w-full"
          >
            {t.signin.sign_up}
          </Link>
        </div>
      </form>
    </div>
  )
}
