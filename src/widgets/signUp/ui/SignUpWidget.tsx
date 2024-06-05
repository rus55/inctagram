import { FC, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { SignUpAuth } from '../signUpAuth/SignUpAuth'

import styles from './SignUpWidget.module.scss'

import { AppDispatch } from '@/app/appStore'
import { useRegistrationMutation } from '@/entities/auth'
import { setUser } from '@/entities/auth/model/authSlice'
import { AUTH_URLS } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'
// import {Button, SuperCheckbox} from '@/shared/components'
import { Button } from '@/shared/components/button'
import { SuperCheckbox } from '@/shared/components/checkbox'
import { consoleErrors, useFetchLoader, useTranslation } from '@/shared/lib'
import { useClient } from '@/shared/lib/hooks/useClient'
import { IAuthInput } from '@/shared/types'

export const SignUpWidget: FC = () => {
  const {
    register: registerInput,
    handleSubmit,
    formState,
    getValues,
    setError,
    trigger,
    getFieldState,
  } = useForm<IAuthInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const { t } = useTranslation()

  const { isClient } = useClient()

  const [agree, setAgree] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const [socialsLoading, setSocialsLoading] = useState(false)

  const [registration, { isLoading, isSuccess, error }] = useRegistrationMutation()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    dispatch(setUser({ userName: data.username, email: data.email }))

    registration({ email: data.email, userName: data.username, password: data.password })
  }

  useEffect(() => {
    isSuccess && router.push('/email-sent')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    isClient && trigger()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.signin.error_message])

  const login = (url: string) => {
    setSocialsLoading(true)
    window.location.assign(url)
  }

  useEffect(() => {
    if (error) {
      consoleErrors(error as Error)
      const e = error as CustomerError

      const field = e.data.messages && Array.isArray(e.data.messages) && e.data.messages[0]?.field

      if (field) {
        setError('username', {
          type: 'server',
          message: t.signup.user_exist_error,
        })
      } else {
        setError('password', {
          type: 'server',
          message: t.signin.error_message,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  useFetchLoader(isLoading || socialsLoading)

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{t.signup.title}</h1>
      <div className={styles.icon}>
        <Button variant="link" onClick={() => login(AUTH_URLS.GOOGLE)}>
          <GoogleIcon />
        </Button>
        <Button variant="link" onClick={() => login(AUTH_URLS.GITHUB)}>
          <GithubIcon className="fill-light-100" />
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <SignUpAuth
          formState={formState}
          register={registerInput}
          isPasswordRequired
          getValues={getValues}
        />

        <div className={styles.checkbox}>
          <SuperCheckbox checked={agree} onCheckedChange={() => setAgree(agree => !agree)} />
          <label htmlFor="agree" className="text-xs text-light-100">
            <span>{t.signup.agreement} </span>
            <Link href="auth/terms-of-service">{t.signup.terms_service}</Link>
            <span> {t.signup.and} </span>
            <Link href="/auth/privacy">{t.signup.privacy_policy}</Link>
          </label>
        </div>
        <button
          className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded my-4 disabled:opacity-75"
          disabled={!(formState.isValid && agree)}
        >
          {t.signup.sign_up}
        </button>
        <div className="font-base text-light-100 text-center">{t.signup.account_question}</div>
        <div className="text-center mt-3">
          <Link
            href={'/signin'}
            className="font-semibold text-primary-500 p-4 bg-transparent w-full"
          >
            {t.signup.sign_in}
          </Link>
        </div>
      </form>
    </div>
  )
}
