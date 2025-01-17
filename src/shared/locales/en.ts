import { enTextsPrivacyPolicy } from '@/shared/locales/en-texts-privacy-policy'
import { enTextsTermsOfService } from '@/shared/locales/en-texts-terms-of-service'

export const en = {
  lg: 'en',
  home: {
    home: 'Home',
    create: 'Create',
    profile: 'My Profile',
    messenger: 'Messenger',
    search: 'Search',
    statistics: 'Statistics',
    favorites: 'Favorites',
    profile_btn: 'Profile Settings',
    View_all_comments: 'View all comments',
  },
  resend: {
    title: 'Email verification link expired',
    message:
      'Looks like the verification link has expired. Not to worry, we can send the link again',
    resend_link: 'Resend verification link',
  },
  signup_confirm: {
    congratulations: 'Congratulations!',
    confirmed: 'Your email has been confirmed',
    sign_in: 'Sign In',
  },
  signin: {
    title: 'Sign In',
    email: 'Email',
    password: 'Password',
    forgot_password: 'Forgot Password',
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    log_in: 'Log in ',
    account_question: 'Don’t have an account?',
    error_message: 'The email or password are incorrect. Try again please',
    email_required: 'Email is required',
    password_required: 'Password is required',
  },
  signup: {
    title: 'Sign Up',
    email: 'Email',
    password: 'Password',
    password_confirmation: 'Password Confirmation',
    forgot_password: 'Forgot Password',
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    account_question: 'Do you have an account?',
    agreement: 'I agree to the ',
    and: 'and',
    terms_service: 'Terms of Service',
    privacy_policy: 'Privacy Policy',
    username: 'Username',
    username_required: 'Username is required',
    user_exist_error: 'User with this email is already registered',
    email_required: 'Email is required',
    password_required: 'Password is required',
    email_invalid: 'Email is invalid',
    minPasswordLength: 'Minimum number of characters 6',
  },

  forgotpassword: {
    title: 'Forgot Password',
    email: 'Email',
    message: 'Enter your email address and we will send you further instructions',
    send_link: 'Send Link',
    back_signin: 'Back to Sign In',
    checkbox_text: 'I’m not a robot',
    lg: 'en',
  },

  email: {
    title: 'Email sent',
    message: 'We have sent a link to confirm your email to ',
    yes: 'OK',
  },

  logout: {
    title: 'Log out',
    message: 'Are you really want to log out of your account ',
    yes: 'Yes',
    no: 'No',
  },

  password_recovery: {
    title: 'Create New Password',
    message: 'Your password must be between 6 and 20 characters',
  },

  messages: {
    password_validate_message:
      'Password must contain 0-9, a-zа-я, A-ZА-Я, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~ ',
    user_max_length: 'Maximum number of characters 30',
    user_min_length: 'Minimum number of characters 6',
    password_min_length: 'Minimum number of characters 6',
    password_max_length: 'Maximum number of characters 20',
    name_format_message: 'The name must contain characters, not spaces, not start with numbers',
    email_format_message: 'The email must match the format example@example.com',
    password_match_message: 'Password must match',
  },

  terms_of_service: {
    button_text: 'Back to Sign Up',
    button_to_profile: 'Back to Profile',
    title: 'Terms of Service',
    text: enTextsTermsOfService,
  },
  privacy_policy: {
    title: 'Privacy Policy',
    text: enTextsPrivacyPolicy,
  },
  sidebar: {
    home: 'Home',
    create: 'Create',
    my_profile: 'My Profile',
    messenger: 'Messenger',
    search: 'Search',
    statistics: 'Statistics',
    favorites: 'Favorites',
    settings: 'Profile Settings',
    log_out: 'Log Out',
  },
  sidebarAdmin: {
    userList: 'User list',
    paymentsList: 'Payments list',
    postsList: 'Posts list',
    statistics: 'Statistics',
  },
  notification_menu: {
    title: 'Notifications',
  },
  add_following: {
    // title_of_delete_modal: 'Удалить подписку',
    // delete_button: 'Отписаться',
    text: 'Are you sure you want to subscribe to',
  },
  profile: {
    user_name: 'Username',
    first_name: 'First name',
    last_name: 'Last name',
    birth_date: 'Date of birth',
    country: 'Select your country',
    country_blank: 'Country',
    cities: 'Select your city',
    city_blank: 'City',
    about: 'About Me',
    age_error: 'A user under 13 cannot create a profile. ',
    age_too_old: 'Enter your real age. ',
    names_max_length: 'Maximum number of characters 50',
    about_max_length: 'Maximum number of characters 200',
    first_name_required: 'First name is required',
    last_name_required: 'Last name is required',
    first_name_message: 'The first name contain characters, not spaces, not numbers',
    last_name_message: 'The last name contain characters, not spaces, not numbers',
    button: 'Save changes',
    general_information: 'General Information',
    devices: 'Devices',
    account_management: 'Account Management',
    my_payments: 'My Payments',
    auth_error: 'Auth error. Signin again',
    server_error: 'Server error. Reload page',
    user_name_error: 'User with this name already exist',
    success: 'Your settings are saved!',
  },
  add_profile_photo: {
    add_profile_photo_text: 'Add a Profile Photo',
    text_of_button_select_from_comp: 'Select from Computer',
    error_type_of_photo: 'The format of the uploaded photo must be PNG and JPEG.',
    error: 'Error! ',
    error_size_photo: 'The photo size should not exceed 10 MB!',
    save_button: ' Save',
  },
  delete_photo_of_profile: {
    title_of_modal: 'Delete Photo',
    text: 'Are you sure you want to delete the photo?',
    button_yes: 'Yes',
    button_no: 'No',
  },
  following_modal: {
    input_placeholder: 'Search',
    title: 'Following',
    followings_title: 'Following',
    follow_button: 'Follow',
  },
  delete_following: {
    title_of_delete_modal: 'Delete Following',
    delete_button: 'Unfollow',
    text: 'Do you really want to Unfollow from this user ',
  },
  followers_modal: {
    title: 'Followers',
    modals_title: 'Followers',
    button_remove: 'Remove',
    post: 'Publications',
  },
  delete_followers: {
    remove_text: 'Do you really want to remove',
  },

  registered_users: {
    title: 'Registered Users:',
  },
  post_view: {
    edit: 'Edit Post',
    delete: 'Delete Post',
    answer: 'Answer',
    like: 'Like',
    add_comment: 'Add a Comment...',
    publish: 'Publish',
    description: 'Add publication descriptions',
    save: 'Save changes',
    delete_confirm: 'Are you sure you want to delete this post?',
    close_edit_title: 'Close Post',
    close_edit_confirm:
      'Do you really want to close the edition of the publication? If you close changes won’t be saved',
    post_error: 'Maximum number of characters 500',
    no_content: 'No posts yet',
  },
  post: {
    post_modal_title: 'Add photo',
    crop_modal_title: 'Cropping',
    button_navigation_text: 'Next',
    select_button: 'Select',
    draft_button: 'Open Draft',
    aspect_original: 'Original',
    filter_modal: 'Filters',
    publication_modal: 'Publication',
    publish_button: 'Publish',
    label_of_textarea: 'Add publication descriptions',
    placeholder_of_textarea: 'Add your description',
    label_of_input: 'Add location',
    title_close_modal: 'Close',
    text_close_modal:
      ' Do you really want to close the creation of a publication? If you close everything will be\n' +
      '          deleted',
    discard_button: 'Discard',
    save_draft: 'Save draft',
    add_img_message: 'You have added the maximum number of photos allowed!',
  },
  subscription: {
    day: '$10 per 1 Day',
    week: '$50 per 7 Day',
    month: '$100 per month',
  },
  text_subscription_costs: 'Your subscription costs',
  current_subscription: 'Current Subscription',

  text_account: 'Account type',
  account_type: {
    personal: 'Personal',
    business: 'Business',
  },
  text_success: 'Success',
  payment_success: 'Payment was successful!',
  button_ok: 'OK',

  text_error: 'Error',
  transaction_failed: 'Transaction failed. Please, write to support',
  button_back: 'Back to payment',

  auto_renewal: 'Auto-Renewal',
  expire_at: 'Expire at',
  next_payment: 'Next payment',
  devices: {
    log_out: 'Log Out',
    Terminate_sessions: 'Terminate all other sessions',
  },

  date_of_payment: 'Date of Payment',
  end_date_of_subscription: 'End date of subscription',
  amount: 'Amount',
  price: 'Price',
  subscription_type: 'Subscription Type',
  subscription_text: 'Subscription',
  payment_type: 'Payment Type',
  payment_method: 'Payment Method',
  show: 'Show',
  on_page: 'on page',

  user_list: {
    id: 'User ID',
    name: 'Username',
    profile: 'Profile link',
    date: 'Date added',

    not_selected: 'Not Selected',
    blocked: 'Blocked',
    not_blocked: 'Not Blocked',

    more: 'More information',
    ban: 'Ban in the system',
    delete_user: 'Delete user',
    unban_user: 'Un-ban user',
    confirmation: 'Are you sure to delete user',
    confirmation_unBan: 'Are you sure want to un-ban',

    reason_for_ban: 'Reason for ban',
    bad_behavior: 'Bad behavior',
    advertising_placement: 'Advertising placement',
    another_reason: 'Another reason',

    are_you_sure_you: 'Are you sure you want to ban the user',
    user_blocking: 'User blocking',
    no: 'No',
    yes: 'Yes',
    unBan: 'Un-ban',
    backToUserList: 'Back to User List',
  },
  user_info: {
    usertId: 'User ID',
    profileDate: 'Profile Creation Date',
    uploaded_photos: 'Uploaded photos',
    payments: 'Payments',
    followers: 'Followers',
    following: 'Following',
    userName: 'UserName',
    profileLink: 'Profile link',
    subscriptionDate: 'Subscription Date',
    not_found: 'Not found',
  },
  notification(message: string) {
    const datePattern = /(\d{2}\/\d{2}\/\d{4})/
    const match = message?.match(datePattern)

    if (match) {
      const [month, day, year] = match[0].split('/')
      const formattedDate = `${day}.${month}.${year}`

      return `Your subscription has been activated and is valid until ${formattedDate}`
    }
    const messages = {
      'Your subscription-ws ends in 1 day': 'Your subscription-ws ends in 1 day',
      'Your subscription ends in 7 days': 'Your subscription ends in 7 days',
      'The next subscription payment will be debited from your account after 1 day.':
        'The next subscription payment will be debited from your account after 1 day.',
    }

    return messages[message as keyof typeof messages]
  },
  new_notification: 'New notification!',
  new_title: 'new',
  today: 'today',
  hide: 'hide',
  show_more: 'show more',
  sendMessage: 'Send Message',
  publications: 'Publications',
}
export type LangType = typeof en
