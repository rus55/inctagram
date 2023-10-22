import { LangType } from './en'

import { ruTextsTermsOfService } from '@/shared/locales/ru-terms-of-service'
export const ru: LangType = {
  home: {
    home: 'Главная',
    create: 'Создать',
    profile: 'Мой Профиль',
    messenger: 'Мессенджер',
    search: 'Поиск',
    statistics: 'Статистика',
    favorites: 'Избранное',
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
      'Пароль должен содержать  a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~ ',
    user_max_length: 'Максимальное количество символов 30',
    user_min_length: 'Минимальное количество символов 6',
    password_min_length: 'Минимальное количество символов 6',
    password_max_length: 'Максимальное количество символов 20',
    name_format_message:
      'Имя должно содержать символы, не содержать пробелов, не начинаться с цифр',
    email_format_message: 'Электронная почта должна соответствовать формату example@example.com',
    password_match_message: 'Пароли должны совпадать',
  },
  terms_of_service: {
    button_text: 'Вернуться к регистрации',
    title: 'Условия использования',
    text: ruTextsTermsOfService,
  },
  privacy_policy: {
    buttons_text: 'Вернуться к регистрации',
    title: 'Политика конфиденциальности',
    text: `1. Введение

Добро пожаловать на Inctagram, социальную платформу, ценящую вашу конфиденциальность и безопасность данных. Настоящая Политика конфиденциальности описывает наше обязательство по защите ваших личных данных и объясняет, как мы собираем, используем и обеспечиваем безопасность ваших данных.

2. Информация, которую мы собираем

Мы собираем следующие виды информации:

Личная информация: Информацию, которую вы предоставляете при регистрации, такую как ваше имя, адрес электронной почты и дата рождения.

Пользовательский контент: Контент, который вы публикуете, включая фотографии, видео и сообщения.

Информация об использовании: Информацию о том, как вы используете Inctagram, включая ваши взаимодействия с другими пользователями и контентом, который вы просматриваете.

Информация об устройстве: Информацию об устройствах, которые вы используете для доступа к Inctagram, включая тип устройства, операционную систему и уникальные идентификаторы устройств.

Информация о местоположении: Если вы включите службы местоположения, мы можем собирать точное или приблизительное местоположение.

Куки и аналогичные технологии: Мы используем куки и аналогичные технологии для отслеживания вашего использования Inctagram и сбора данных о ваших взаимодействиях.

3. Как мы используем вашу информацию

Мы используем вашу информацию для следующих целей:

Предоставление, поддержание и улучшение Inctagram.
Настройка вашего опыта и контента, который вы видите.
Общение с вами и отправка важных обновлений.
Защита безопасности и целостности нашей платформы.
Соблюдение юридических и регуляторных требований.
4. Предоставление вашей информации

Мы можем предоставлять вашу информацию следующим лицам:

Другим пользователям Inctagram согласно вашим настройкам конфиденциальности.
Поставщикам сторонних услуг, которые помогают нам предоставлять наши услуги.
Личным правоохранительным органам и регулирующим органам, когда это необходимо.
5. Безопасность данных

Мы серьезно относимся к безопасности данных и принимаем меры для защиты ваших данных. Однако ни один метод передачи или хранения не может быть 100% безопасным. Мы не можем гарантировать безопасность ваших данных.

6. Ваши выборы

Вы можете управлять настройками конфиденциальности на Inctagram, включая то, кто видит ваш контент и может взаимодействовать с вами. Вы также можете отказаться от получения рекламных электронных писем.

7. Конфиденциальность детей

Inctagram не предназначен для лиц младше 13 лет. Мы не собираем и не храним информацию о детях младше этого возраста.

8. Изменения в настоящей Политике конфиденциальности

Мы можем время от времени обновлять настоящую Политику конфиденциальности. Когда это происходит, мы уведомляем вас о изменениях через коммуникационные каналы Inctagram.

9. Свяжитесь с нами

Если у вас есть вопросы или замечания относительно настоящей Политики конфиденциальности или ваших данных, пожалуйста, свяжитесь с нами по адресу [Ваша контактная информация].`,
  },
}
