import ClerkService from '@/services/ClerkService';
import { isClerkAPIResponseError, useClerk } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useImg } from './useImg';
import { ClerkAPIError, UserResource, ClerkAPIErrorJSON } from '@clerk/types';
import { showErrorToast, showSuccessToast } from '@/utils/toastConfig';

export const useUserManipulation = (user: UserResource) => {
  const { signOut } = useClerk();
  const { convertToBase64, imageUri, imageUriUi, pickImage, setImageUri } = useImg(
    user?.imageUrl || null
  );
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isEmailChange, setIsEmailChange] = useState(false);
  const [prevEmail, setPrevEmail] = useState('');
  const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);
  const [updatePasswordError, setUpdatePasswordError] = useState<null | ClerkAPIError[]>(null);
  const [changeEmailLoading, setChangeEmailLoading] = useState(false);
  const [changeEmailError, setChangeEmailError] = useState<null | ClerkAPIErrorJSON[]>(null);
  const [verifyPasswordLoading, setVerifyPasswordLoading] = useState(false);
  const [verifyPasswordError, setVerifyPasswordError] = useState<null | ClerkAPIErrorJSON[]>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState<null | ClerkAPIError[]>(null);
  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const [updateUserError, setUpdateUserError] = useState<null | ClerkAPIError[]>(null);

  useEffect(() => {
    setPrevEmail(user?.emailAddresses[0].id);
  }, [user]);

  useEffect(() => {
    showErrorToast(updatePasswordError);
    showErrorToast(changeEmailError);
    showErrorToast(verifyPasswordError);
    showErrorToast(logoutError);
    showErrorToast(updateUserError);
  }, [updatePasswordError, changeEmailError, verifyPasswordError, logoutError, updateUserError]);

  const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setUpdatePasswordError(null);
      setUpdatePasswordLoading(true);
      await user.updatePassword({ currentPassword, newPassword });
      showSuccessToast('Password updated');
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) setUpdatePasswordError(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setUpdatePasswordLoading(false);
    }
  };

  const handleChangeEmail = async (emailAddress: string, prevEmail: string) => {
    try {
      setChangeEmailError(null);
      setChangeEmailLoading(true);
      await ClerkService.createUserEmail(user.id, emailAddress);
      await ClerkService.deleteUserEmail(prevEmail);
      await user.reload();
      setIsEmailChange(true);
    } catch (err: any) {
      setChangeEmailError(err.response.data.errors as ClerkAPIErrorJSON[]);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setChangeEmailLoading(false);
    }
  };

  const verifyPassword = async (password: string) => {
    try {
      setVerifyPasswordError(null);
      setVerifyPasswordLoading(true);
      await ClerkService.verifiyUserPassword(user.id, password);
      setIsPasswordCorrect(true);
    } catch (err: any) {
      setVerifyPasswordError(err.response.data.errors as ClerkAPIErrorJSON[]);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setVerifyPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutError(null);
      setLogoutLoading(true);
      await signOut();
      router.replace('/');
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) setLogoutError(err.errors);
      console.error('Error signing out:', err);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleUpdateUser = async (username: string) => {
    try {
      setUpdateUserLoading(true);
      setUpdateUserError(null);
      if (imageUri) {
        const imgBase64 = await convertToBase64(imageUri);
        await user.setProfileImage({ file: imgBase64 });
        setImageUri(null);
      }
      await user?.update({ username });
      showSuccessToast('User updated');
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) setUpdateUserError(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setUpdateUserLoading(false);
    }
  };

  return {
    imageUriUi,
    pickImage,
    isEmailChange,
    isPasswordCorrect,
    logoutError,
    updatePasswordError,
    updatePasswordLoading,
    updateUserError,
    updateUserLoading,
    verifyPassword,
    verifyPasswordError,
    verifyPasswordLoading,
    handleLogout,
    handleChangeEmail,
    prevEmail,
    setUpdateUserError,
    handleUpdateUser,
    handleUpdatePassword,
    changeEmailLoading,
    changeEmailError,
    logoutLoading,
  };
};
