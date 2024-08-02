import { ClerkAPIError, ClerkAPIErrorJSON } from '@clerk/types';
import Toast from 'react-native-toast-message';
import CustomToast from '@/components/CustomToast';

export const ErrorToast = (message: string[]) => {
  return Toast.show({
    type: 'errorToast',
    props: {
      message,
    },
  });
};

export const showSuccessToast = (message: string) => {
  return Toast.show({
    type: 'successToast',
    props: {
      message,
    },
  });
};

export const showErrorToast = (errorArr: ClerkAPIError[] | null | ClerkAPIErrorJSON[]) => {
  if (errorArr?.length) {
    const errors = errorArr?.map((item) => {
      // @ts-ignore
      return item.longMessage || item.long_message;
    }) as string[];
    ErrorToast(errors);
  }
};

export const toastConfig = {
  errorToast: ({ props }: { props: { message: string[] } }) => (
    <CustomToast type="error" message={props.message} />
  ),
  successToast: ({ props }: { props: { message: string } }) => (
    <CustomToast type="success" message={[props.message]} />
  ),
};
