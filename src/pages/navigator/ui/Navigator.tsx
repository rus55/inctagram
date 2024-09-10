import Link from 'next/link'

export function Navigator() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/my-profile">Home</Link>
        </li>
        <li>
          <Link href="email-sent">Email sent</Link>
        </li>
        <li>
          <Link href="signup">Sign Up</Link>
        </li>
        <li>
          <Link href="auth/registration-confirmation">Sign Up Confirmed</Link>
        </li>
        <li>
          <Link href="signin">Sign In</Link>
        </li>
        <li>
          <Link href="resend">Resend Verification Link Password recovery</Link>
        </li>
        <li>
          <Link href="auth/registration-resend">Resend Verification Link Registration</Link>
        </li>
        <li>
          <Link href="auth/forgot-password">Forgot password</Link>
        </li>
        <li>
          <Link href="auth/create-new-password">Create new password</Link>
        </li>
        <li>
          <Link href="auth/terms-of-service">Terms of Service</Link>
        </li>
        <li>
          <Link href="/auth/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="test">Component`s test page</Link>
        </li>
        <li>
          <Link href="/my-profile/general-information">My Profile</Link>
        </li>
      </ul>
    </div>
  )
}
