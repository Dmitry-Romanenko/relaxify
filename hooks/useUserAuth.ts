import { showErrorToast } from '@/utils/toastConfig';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export const useUserAuth = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState<null | ClerkAPIError[]>(null);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<null | ClerkAPIError[]>(null);
  const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);
  const [verifyEmailError, setVerifyEmailError] = useState<null | ClerkAPIError[]>(null);
  const [sendResetPasswordLoading, setSendResetPasswordLoading] = useState(false);
  const [sendResetPasswordError, setSendResetPasswordError] = useState<null | ClerkAPIError[]>(
    null
  );
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState<null | ClerkAPIError[]>(null);
  const [isResetSended, setIsResetSended] = useState(false);

  useEffect(() => {
    showErrorToast(signUpError);
    showErrorToast(verifyEmailError);
    showErrorToast(signInError);
    showErrorToast(sendResetPasswordError);
  }, [signUpError, verifyEmailError, signInError, sendResetPasswordError]);

  const onSignUpPress = async (username: string, emailAddress: string, password: string) => {
    try {
      setSignUpLoading(true);
      setSignUpError(null);
      await signUp!.create({
        username,
        emailAddress,
        password,
      });
      await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) setSignUpError(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setSignUpLoading(false);
    }
  };

  const onPressVerify = async (code: string) => {
    try {
      setVerifyEmailLoading(true);
      setVerifyEmailError(null);
      const signUpAttempt = await signUp!.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === 'complete') {
        await setActive!({ session: signUpAttempt.createdSessionId });
        router.replace('/home');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) setVerifyEmailError(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setVerifyEmailLoading(false);
    }
  };

  const onSignInPress = async (email: string, password: string) => {
    try {
      setSignInLoading(true);
      setSignInError(null);
      const signInAttempt = await signIn!.create({
        identifier: email,
        password,
      });
      if (signInAttempt.status === 'complete') {
        await setActive!({ session: signInAttempt.createdSessionId });
        router.replace('/home');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) setSignInError(err.errors);
    } finally {
      setSignInLoading(false);
    }
  };

  async function sendResetPassword(emailAddress: string) {
    setSendResetPasswordLoading(true);
    setSendResetPasswordError(null);
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      })
      .then(() => {
        setIsResetSended(true);
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        if (isClerkAPIResponseError(err)) setSendResetPasswordError(err.errors);
      })
      .finally(() => setSendResetPasswordLoading(false));
  }

  async function resetPassword(code: string, password: string) {
    setResetPasswordLoading(true);
    setResetPasswordError(null);
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        if (result.status === 'complete') {
          setActive!({ session: result.createdSessionId });
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        if (isClerkAPIResponseError(err)) setResetPasswordError(err.errors);
      });
  }

  return {
    onSignInPress,
    onSignUpPress,
    onPressVerify,
    isLoaded,
    pendingVerification,
    signInError,
    signInLoading,
    signUpError,
    signUpLoading,
    verifyEmailLoading,
    verifyEmailError,
    sendResetPassword,
    resetPassword,
    isResetSended,
    sendResetPasswordLoading,
    sendResetPasswordError,
    resetPasswordError,
    resetPasswordLoading,
  };
};
