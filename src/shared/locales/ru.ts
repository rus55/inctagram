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
    View_all_comments: 'Посмотреть все комментарии',
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
    log_in: 'Войти',
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
    button_to_profile: 'Вернуться к профилю',
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
    settings: 'Настройки профиля',
    log_out: 'Выйти',
  },
  sidebarAdmin: {
    userList: 'Список пользователей',
    paymentsList: 'Список платежей',
    postsList: 'Список постов',
    statistics: 'Статистика',
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
    age_too_old: 'Введите действительную дату рождения. ',
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
    server_error: 'Ошибка сервера. Перезагрузите страницу',
    user_name_error: 'Пользователь с таким именем уже существует',
    success: 'Ваши настройки профиля сохранены!',
  },

  following_modal: {
    input_placeholder: 'Поиск',
    title: 'Подписки',
    followings_title: 'Подписок',
    follow_button: 'Подписаться',
  },
  add_profile_photo: {
    add_profile_photo_text: 'Добавить фотографию',
    text_of_button_select_from_comp: 'Выбрать с компьютера',
    error_type_of_photo: 'Формат загружаемой фотографии должен быть\n' + 'PNG или JPEG',
    error: 'Ошибка! ',
    error_size_photo: 'Размер фотографии не должен превышать 10 МБ!',
    save_button: 'Сохранить',
  },
  delete_photo_of_profile: {
    text: 'Вы уверены, что хотите удалить фотографию?',
    title_of_modal: 'Удалить фото',
    button_yes: 'Да',
    button_no: 'Нет',
  },
  delete_following: {
    title_of_delete_modal: 'Удалить подписку',
    delete_button: 'Отписаться',
    text: 'Вы действительно хотите отписаться от',
  },
  add_following: {
    // title_of_delete_modal: 'Удалить подписку',
    // delete_button: 'Отписаться',
    text: 'Вы действительно хотите подписаться на',
  },
  followers_modal: {
    title: 'Подписчики',
    modals_title: 'Подписчиков',
    button_remove: 'Удалить',
    post: 'Публикаций',
  },
  delete_followers: {
    remove_text: 'Вы действительно хотите удалить',
  },
  registered_users: {
    title: 'Зарегистрированные Пользователи:',
  },
  post_view: {
    edit: 'Редактировать',
    delete: 'Удалить пост',
    answer: 'Ответить',
    like: 'Нравится',
    add_comment: 'Добавить комментарий...',
    publish: 'Опубликовать',
    description: 'Добавьте описание',
    save: 'Сохранить изменения',
    delete_confirm: 'Вы точно хотите удалить пост?',
    close_edit_title: 'Закрыть редактирование',
    close_edit_confirm:
      'Вы действительно хотите закрыть редактирование поста? Изменения не сохраняться',
    post_error: 'Максимально допустимое число символов - 500',
    no_content: 'Пока нет публикаций',
  },

  post: {
    post_modal_title: 'Добавить фотографию',
    crop_modal_title: 'Обрезать',
    button_navigation_text: 'Далее',
    select_button: 'Выбрать',
    draft_button: 'Открыть черновик',
    aspect_original: 'Оригинал',
    filter_modal: 'Фильтры',
    publication_modal: 'Публикация',
    publish_button: 'Опубликовать',
    label_of_textarea: 'Добавить описание поста',
    placeholder_of_textarea: 'Добавь описание',
    label_of_input: 'Добавить локацию',
    title_close_modal: 'Закрыть',
    text_close_modal:
      'Вы действительно хотите закрыть создание публикации? Если закрыть, все будет удалено!',
    discard_button: 'Сбросить',
    save_draft: 'Сохранить',
    add_img_message: 'Ты добавил максимально допустимое количество фотографий!',
  },
  subscription: {
    day: '10$ за один день',
    week: '50$ за неделю',
    month: '100$ за месяц',
  },
  text_subscription_costs: 'Стоимость подписки',
  current_subscription: 'Текущая подписка',

  text_account: 'Тип аккаунта',
  account_type: {
    personal: 'Персональный',
    business: 'Бизнес',
  },
  text_success: 'Успешно',
  payment_success: 'Оплата прошла успешно!',
  button_ok: 'ОТЛИЧНО',

  text_error: 'Ошибка',
  transaction_failed: 'Транзакция не прошла. Пожалуйста, напишите в службу поддержки',
  button_back: 'Назад к оплате',

  auto_renewal: 'Автопродление',
  expire_at: 'Истекает',
  next_payment: 'Следующий платеж',
  devices: {
    log_out: 'Выйти',
    Terminate_sessions: 'Завершить все остальные сеансы',
  },

  date_of_payment: 'Дата оплаты',
  end_date_of_subscription: 'Дата окончания подписки',
  amount: 'Сумма',
  price: 'Цена',
  subscription_text: 'Подписка',
  subscription_type: 'Тип подписки',
  payment_type: 'Тип оплаты',
  payment_method: 'Способ оплаты',
  show: 'Показать',
  on_page: 'на странице',

  user_list: {
    id: 'ID пользователя',
    name: 'Имя пользователя',
    profile: 'Ссылка профиля',
    date: 'Дата регистрации',

    not_selected: 'Не выбрано',
    blocked: 'Заблокировано',
    not_blocked: 'Не заблокировано',
    user_blocking: 'Блокировка пользователя',
    more: 'Подробнее',
    ban: 'Заблокировать',
    delete_user: 'Удалить пользователя',
    confirmation: 'Вы уверены, что хотите удалить пользователя',
    unBan: 'Разблокировать',

    reason_for_ban: 'Причина блокировки',
    bad_behavior: 'Плохое поведение',
    advertising_placement: 'Размещение рекламы',
    another_reason: 'Другая причина',

    are_you_sure_you: 'Вы уверены, что хотите заблокировать пользователя',

    no: 'Нет',
    yes: 'Да',

    backToUserList: 'Назад к списку пользователей',
    unban_user: 'Блокировка пользователя',
    confirmation_unBan: 'Вы уверены, что хотите снять запрет с ',
  },
  user_info: {
    usertId: 'ID Пользователя',
    profileDate: 'Дата создания профиля',
    uploaded_photos: 'Загруженные фотографии',
    payments: 'Платежи',
    followers: 'Подписчики',
    following: 'Подписки',
    userName: 'Имя пользователя',
    profileLink: 'Ссылка на профиль',
    subscriptionDate: 'Дата подписки',
    not_found: 'Не найдено',
  },
  notification(message: string) {
    const datePattern = /(\d{2}\/\d{2}\/\d{4})/
    const match = message?.match(datePattern)

    if (match) {
      const [month, day, year] = match[0].split('/')
      const formattedDate = `${day}.${month}.${year}`

      return `Ваша подписка активирована и действует до ${formattedDate}`
    }
    const messages = {
      'Your subscription-ws ends in 1 day': 'Ваша подписка истекает через 1 день',
      'Your subscription ends in 7 days': 'Ваша подписка истекает через 7 дней',
      'The next subscription payment will be debited from your account after 1 day.':
        'Следующий платеж у вас спишется через 1 день',
    }

    return messages[message as keyof typeof messages]
  },
  new_notification: 'Новое уведомление!',
  new_title: 'Новое',
  today: 'сегодня',
  hide: 'скрыть',
  show_more: 'показать',
  sendMessage: 'Написать',
  publications: 'Публикаций',
}
