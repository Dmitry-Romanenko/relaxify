import { SafeAreaView, View, Text } from 'react-native';
import Logo from '@/components/Logo';
import TextField from '@/components/TextField';
import AppButton from '@/components/AppButton';
import Loading from '@/components/Loading';
import { useForm } from '@/hooks/useForm';
import { useUserAuth } from '@/hooks/useUserAuth';

export default function ForgotPassword() {
  const {
    resetPassword,
    sendResetPassword,
    isLoaded,
    isResetSended,
    sendResetPasswordLoading,
    resetPasswordLoading,
  } = useUserAuth();
  const {
    code,
    emailAddress,
    setEmailAddress,
    setCode,
    password,
    onPressTogglePassword,
    hidePassword,
    setPassword,
  } = useForm();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex h-full w-full justify-center bg-bg-primary px-5">
      <View>
        <Logo />
        <Text className="mb-7 mt-7 font-mbold text-2xl text-tx-primary">Forgot Password?</Text>
      </View>
      <View>
        {!isResetSended && (
          <View>
            <TextField
              placeholder="Your email"
              label="Email"
              onChangeText={(email) => setEmailAddress(email)}
              value={emailAddress}
            />
            <AppButton
              disabled={sendResetPasswordLoading || !emailAddress.trim()}
              text="Send password reset code"
              onPress={async () => await sendResetPassword(emailAddress)}
            />
          </View>
        )}
        {isResetSended && (
          <View>
            <TextField
              placeholder="Your password"
              secureTextEntry={hidePassword}
              label="Password"
              withIcon
              iconName={hidePassword ? 'eye' : 'eye-slash'}
              onIconPress={onPressTogglePassword}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
            <TextField
              placeholder="Code..."
              label="Code"
              onChangeText={(code) => setCode(code)}
              value={code}
            />
            <AppButton
              disabled={resetPasswordLoading || !code.trim() || !password.trim()}
              text="Reset"
              onPress={async () => await resetPassword(code, password)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
