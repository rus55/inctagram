import { useEffect, useState } from 'react'

import { differenceInYears } from 'date-fns'
import { useRouter } from 'next/router'
import { DateRange } from 'react-day-picker'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCountries } from '../model/useCountries'

import { AsyncSelect } from './AsyncSelect'
import s from './GeneralInformation.module.scss'

import { setAlert } from '@/app/services'
import { clearLocalUserData } from '@/entities/auth'
import { useGetProfileQuery } from '@/entities/profile'
import { usePutProfileMutation } from '@/entities/profile/api/profileApi'
import { Button, Input, Textarea, SelectCustom, Typography } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { useAppDispatch, useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { firstNameValidation, nameValidation } from '@/shared/regex'
import { ProfilePhotoForGeneralInfo } from '@/widgets/addProfilePhoto'
import { TabsLayout } from '@/widgets/layouts'

const Information = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    setValue,
    trigger,
  } = useForm<ProfilePut>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })
  const { accessToken } = useAuth()
  const { data: profile, isLoading, error } = useGetProfileQuery({ accessToken } as UserAuthData)

  const [putProfile, { isLoading: isPutLoading, error: putError, isSuccess }] =
    usePutProfileMutation()

  useEffect(() => {
    
    if (putError) {
      const e = putError as CustomerError

      if (e.status === 400) {
        setError('userName', { type: 'server', message: t.profile.user_name_error })
      } else {
        dispatch(setAlert({ message: t.profile.auth_error, variant: 'error' }))
        dispatch(clearLocalUserData())
        router.push('/signin')
      }
    } else if (error) {
      dispatch(setAlert({ message: t.profile.auth_error, variant: 'error' }))
      dispatch(clearLocalUserData())
      router.push('/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, putError])

  const [date, setDate] = useState<Date>()

  const handleDate = (date?: Date | DateRange) => {
    if (date && date instanceof Date) {
      const age = differenceInYears(new Date(), date)

      setValue('dateOfBirth', date.toISOString())
      setDate(date)
      if (age < 13) {
        setError('dateOfBirth', {
          type: 'client',
          message: t.profile.age_error,
        })
      } else if (age > 120) {
        setError('dateOfBirth', {
          type: 'client',
          message: t.profile.age_too_old,
        })
      } else {
        clearErrors('dateOfBirth')
        trigger()
      }
    }
  }
  const onSubmit: SubmitHandler<ProfilePut> = body => {
    if (profile?.aboutMe && !body.aboutMe) {
      body.aboutMe = ' '
    }
   
  if (!body.dateOfBirth) {
    body.dateOfBirth = profile?.dateOfBirth 
  }
  

    putProfile({
      body,
      accessToken,
    })
  }

  useEffect(() => {
    if (profile) {
      setTimeout(() => {
        date && handleDate(date)
      })
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.profile.age_error])

  useEffect(() => {
    
    profile?.firstName && setValue('firstName', profile.firstName)
    profile?.lastName && setValue('lastName', profile.lastName)
    profile?.userName && setValue('userName', profile.userName)
    profile?.aboutMe && setValue('aboutMe', profile.aboutMe)
    profile?.aboutMe && setValue('dateOfBirth', profile.dateOfBirth)
    
    

    // eslint-disable-next-line react-hooks/exhaustive-deps, prettier/prettier
  }, [profile?.firstName, profile?.lastName, profile?.userName, profile?.aboutMe, profile?.dateOfBirth])

  useEffect(() => {
    trigger()
    isSuccess && dispatch(setAlert({ message: t.profile.success, variant: 'info' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const {
    isErrorCountriesData,
    isLoadingCountries,
    country,
    cities,
    countriesData,
    onChangeCountryHandler,
  } = useCountries()

  const onChangeCityHandler = (value: string) => {
    setValue('city', value)
    trigger()
  }

  useFetchLoader(isLoading || isPutLoading || isLoadingCountries)



  return (
    <div className={s.container}>
      <main className={s.mainContainer}>
        <div className={s.imagePicker}>
          <ProfilePhotoForGeneralInfo />
        </div>
        <div className={s.textFormContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={t.profile.user_name}
              labelClass="asterisk"
              type="text"
              {...register('userName', {
                required: t.signup.username_required,
                maxLength: {
                  value: 30,
                  message: t.messages.user_max_length,
                },
                minLength: {
                  value: 6,
                  message: t.messages.user_min_length,
                },
                pattern: {
                  value: nameValidation,
                  message: t.messages.name_format_message,
                },
              })}
              error={errors.userName?.message?.toString()}
              
            />
            <Input
              label={t.profile.first_name}
              labelClass="asterisk"
              type="text"
              {...register('firstName', {
                required: t.profile.first_name_required,
                maxLength: {
                  value: 50,
                  message: t.profile.names_max_length,
                },
                pattern: {
                  value: firstNameValidation,
                  message: t.profile.first_name_message,
                },
              })}
              error={errors.firstName?.message?.toString()}
            />
            <Input
              label={t.profile.last_name}
              labelClass="asterisk"
              type="text"
              {...register('lastName', {
                required: t.profile.last_name_required,
                maxLength: {
                  value: 50,
                  message: t.profile.names_max_length,
                },
                pattern: {
                  value: firstNameValidation,
                  message: t.profile.last_name_message,
                },
              })}
              error={errors.lastName?.message?.toString()}
            />
            <DatePicker
              mode="single"
              errorMessage={errors.dateOfBirth?.message}
              errorLinkHref="/auth/privacy?from=profile"
              errorLinkMessage={t.privacy_policy.title}
              lang={t.lg}
              defaultMonth={profile?.dateOfBirth ? new Date(profile?.dateOfBirth) : undefined}
              label={t.profile.birth_date}
              onBlur={handleDate}
            />
            <div className={s.selects}>
              <SelectCustom
                disabled={isErrorCountriesData}
                options={countriesData?.countriesWithoutCities}
                label={t.profile.country}
                placeHolder={t.profile.country_blank}
                value={country}
                onValueChange={onChangeCountryHandler}
              />
              {cities.length > 100 ? (
                <div className={s.citiesContainer}>
                  <Typography className={s.label} as={'label'}>
                    {t.profile.cities}
                  </Typography>
                  <AsyncSelect cities={cities} onValueChange={onChangeCityHandler} />
                </div>
              ) : (
                <SelectCustom
                  {...register('city')}
                  disabled={!country}
                  label={t.profile.cities}
                  options={cities}
                  placeHolder={profile?.city || t.profile.city_blank}
                  onValueChange={onChangeCityHandler}
                />
              )}
            </div>

            <Textarea
              label={t.profile.about}
              {...register('aboutMe', {
                maxLength: {
                  value: 200,
                  message: t.profile.about_max_length,
                },
              })}
              errorMessage={errors.aboutMe?.message}
            />

            <div className={s.footerContainer}>
              <Button type="submit" disabled={!isValid}>
                {t.profile.button}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export const GeneralInformation = () => {
  return (
    <TabsLayout>
      <Information />
    </TabsLayout>
  )
}
