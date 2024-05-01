import { InputHTMLAttributes } from 'react'

import {
  FormState,
  SubmitHandler,
  UseFormGetValues,
  UseFormRegister,
  UseFormReturn,
  UseFormWatch,
} from 'react-hook-form'

interface IInputField {
  label: string
  placeholder: string
  helperText?: string | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IInputField

export interface IField extends TypeInputPropsField {}

export interface IAuthFields {
  register: UseFormRegister<any>
  formState: FormState<any>
  isPasswordRequired?: boolean
  getValues: UseFormGetValues<any>
}

export interface IAuthInput {
  username: string
  email: string
  password: string
  passwordConfirm?: string
}

export interface IEmailPassword {
  email: string
  password: string
}
export interface IEmailBaseUrl {
  email: string
  baseUrl: string
}

export interface IEmailPasswordUser extends IEmailPassword {
  userName: string
}

export interface IEmailToken {
  accessToken: string
  email?: string
}

export interface ISubscriptionBody {
  typeSubscription: 'DAY' | 'WEEKLY' | 'MONTHLY'
  paymentType: string
  amount: number
  baseUrl: string
}

export interface ISubscriptionBodyWithToken {
  body: ISubscriptionBody
  accessToken: string | undefined
}

export interface IPayments {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}
