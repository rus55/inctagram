import { FC, useEffect, useState } from 'react'

import Link from 'next/link'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import styles from './ForgotPassword.module.scss'

import { useSendCaptchaMutation } from '@/entities/auth'
import { setUser } from '@/entities/auth/model/authSlice'
import { InputField } from '@/shared'
import { consoleErrors, useAppDispatch, useFetchLoader, useTranslation } from '@/shared/lib'
import { useClient } from '@/shared/lib/hooks/useClient'
import { emailValidation } from '@/shared/regex'
import { IAuthInput } from '@/shared/types'
import { SetPopUp } from '@/widgets/emailSendPopUp/ui/SetPopUp'
import { Spinner } from '@/widgets/spinner'

export const ForgotPasswordWidget: FC = () => {
  const {
    register: registerInput,
    handleSubmit,
    formState,
    trigger,
  } = useForm<IAuthInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const { t } = useTranslation()
  const { isClient } = useClient()

  const dispatch = useAppDispatch()

  const [reCaptcha, setReCaptcha] = useState(null)
  const [sendCaptcha, { isLoading, isSuccess }] = useSendCaptchaMutation()

  const onSubmit = (data: any) => {
    sendCaptcha({ email: data.email, recaptcha: reCaptcha }).unwrap().catch(consoleErrors)
    dispatch(setUser({ email: data.email, userName: '' }))
  }

  useEffect(() => {
    isClient && trigger()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.signup.email_invalid])

  useFetchLoader(isLoading)

  return (
    <div>
      {isSuccess && <SetPopUp />}

      <div className={styles.wrapper}>
        <div className={styles.heading}>{t.forgotpassword.title}</div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="mb-1">
            <InputField
              {...registerInput('email', {
                required: t.signup.email_required,
                pattern: {
                  value: emailValidation,
                  message: t.signup.email_invalid,
                },
              })}
              label={t.forgotpassword.email}
              placeholder={t.forgotpassword.email}
              type="email"
              helperText={formState.errors.email?.message?.toString()}
            />
          </div>

          <div className="text-sm text-light-900   mb-4 ">{t.forgotpassword.message}</div>

          <div className="my-4">
            <button
              disabled={!(formState.isValid && reCaptcha)}
              className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded disabled:opacity-75"
            >
              {t.forgotpassword.send_link}
            </button>
          </div>
          <div className="my-8 flex justify-center">
            <Link href={'/signin'} className="font-semibold text-primary-500 bg-transparent ">
              {t.forgotpassword.back_signin}
            </Link>
          </div>

          <div className={styles.captcha}>
            <ReCAPTCHA
              onChange={(value: any) => setReCaptcha(value)}
              sitekey={process.env.captcha_site_key as string}
              hl={t.forgotpassword.lg}
              theme="dark"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
