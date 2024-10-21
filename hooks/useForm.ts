import { useState } from 'react';

interface IUseForm {
  firstNameInput: string;
  emailAddressInput: string;
  passwordInput: string;
  codeInput: string;
}

export const useForm = ({
  codeInput,
  emailAddressInput,
  passwordInput,
  firstNameInput,
}: Partial<IUseForm> = {}) => {
  const [firstName, setFirstName] = useState(firstNameInput || '');
  const [emailAddress, setEmailAddress] = useState(emailAddressInput || '');
  const [password, setPassword] = useState(passwordInput || '');
  const [code, setCode] = useState(codeInput || '');
  const [hidePassword, setHidePassword] = useState(true);

  const onPressTogglePassword = () => {
    setHidePassword((prev) => !prev);
  };

  return {
    firstName,
    setFirstName,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    code,
    setCode,
    hidePassword,
    setHidePassword,
    onPressTogglePassword,
  };
};
