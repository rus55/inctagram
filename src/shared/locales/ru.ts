import { LangType } from './en'

import { ruTextsTermsOfService } from '@/shared/locales/ru-terms-of-service'
import { ruTextsPrivacyPolicy } from '@/shared/locales/ru-texts-privacy-policy'
export const ru: LangType = {
  lg: 'ru',
  home: {
    home: 'Главная',
    create: 'Создать',
    profile: 'Мой Профиль',
    messenger: 'Мессенджер',
    search: 'Поиск',
    statistics: 'Статистика',
    favorites: 'Избранное',
    profile_btn: 'Настройки профиля',
  },
  resend: {
    title: 'Срок действия ссылки для подтверждения электронной почты истек',
    message:
      'Видимо срок действия верификационной ссылки истек. Не беспокойтесь, мы можем отправить Вам ссылку заново',
    resend_link: 'Переслать верификационную ссылку',
  },
  signup_confirm: {
    congratulations: 'Поздравляем!',
    confirmed: 'Ваша регистрация подтверждена',
    sign_in: 'Войти',
  },
  signin: {
    title: 'Войти',
    email: 'Электронная почта',
    password: 'Пароль',
    forgot_password: 'Забыли пароль',
    sign_in: 'Войти',
    sign_up: 'Зарегистрироваться',
    account_question: 'Вы не зарегистрированы?',
    error_message: 'Неверная почта или пароль. Попробуйте еще раз',
    email_required: 'Введите почту',
    password_required: 'Введите пароль',
  },
  signup: {
    title: 'Регистрация',
    email: 'Электронная почта',
    password: 'Пароль',
    password_confirmation: 'Подтверждение пароля',
    forgot_password: 'Forgot Password',
    sign_in: 'Войти',
    sign_up: 'Зарегистрироваться',
    account_question: 'Вы зарегистрированы?',
    agreement: 'Я соглашаюсь с ',
    and: 'и',
    terms_service: 'Условиями обслуживания',
    privacy_policy: 'Политикой конфиденциальности',
    username: 'Имя пользователя',
    username_required: 'Введите имя пользователя',
    user_exist_error: 'Пользователь с такой эл. почтой уже существует',
    email_required: 'Введите почту',
    password_required: 'Введите пароль',
    email_invalid: 'Почта недействительна',
    minPasswordLength: 'Минимальное количество знаков 6',
  },

  forgotpassword: {
    title: 'Забыли пароль',
    email: 'Электронная почта',
    message: 'Введите адрес электронной почты и получите дальнейшие инструкции',
    send_link: 'Отправить ссылку',
    back_signin: 'Вернуться к входу',
    checkbox_text: 'Я не робот',
    lg: 'ru',
  },
  email: {
    title: 'Письмо отправлено',
    message: 'Вам отправлена ссылка для подтверждения по адресу: ',
    yes: 'ОК',
  },

  logout: {
    title: 'Выход',
    message: 'Вы действительно хотите выйти из аккаунта ',
    yes: 'Да',
    no: 'Нет',
  },

  password_recovery: {
    title: 'Создать новый пароль',
    message: 'Пароль должен быть от 6 до 20 символов включительно',
  },

  messages: {
    password_validate_message:
      'Пароль должен содержать 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~ ',
    user_max_length: 'Максимальное количество символов 30',
    user_min_length: 'Минимальное количество символов 6',
    password_min_length: 'Минимальное количество символов 6',
    password_max_length: 'Максимальное количество символов 20',
    name_format_message: 'Имя должно содержать буквы, не содержать пробелов, не начинаться с цифр',
    email_format_message: 'Электронная почта должна соответствовать формату example@example.com',
    password_match_message: 'Пароли должны совпадать',
  },
  terms_of_service: {
    button_text: 'Вернуться к регистрации',
    title: 'Условия использования',
    text: ruTextsTermsOfService,
  },
  privacy_policy: {
    title: 'Политика конфиденциальности',
    text: ruTextsPrivacyPolicy,
  },
  sidebar: {
    home: 'Главная',
    create: 'Создать',
    my_profile: 'Профиль',
    messenger: 'Сообщения',
    search: 'Поиск',
    statistics: 'Статистика',
    favorites: 'Избранное',
    log_out: 'Выйти',
  },
  notification_menu: {
    title: 'Уведомления',
  },
  profile: {
    user_name: 'Имя пользователя',
    first_name: 'Имя',
    last_name: 'Фамилия',
    birth_date: 'Дата рождения',
    country: 'Выберите страну',
    country_blank: 'Страна',
    cities: 'Выберите город',
    city_blank: 'Город',
    about: 'Обо мне',
    age_error: 'Пользователь младше 13 лет не может зарегистрироваться. ',
    names_max_length: 'Максимальное количество символов 50',
    about_max_length: 'Максимальное количество символов 200',
    first_name_required: 'Имя обязательно',
    last_name_required: 'Фамилия обязательна',
    first_name_message: 'Имя должно содержать буквы, не содержать пробелов и цифр',
    last_name_message: 'Фамилия должна содержать буквы, не содержать пробелов и цифр',
    button: 'Сохранить изменения',
    general_information: 'Основная информация',
    devices: 'Устройства',
    account_management: 'Управление аккаунтом',
    my_payments: 'Мои платежи',
    auth_error: 'Ошибка авторизации. Войдите еще раз',
    user_name_error: 'Пользователь с таким именем уже существует',
  },
}
