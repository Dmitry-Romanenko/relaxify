import { useUser } from '@clerk/clerk-expo';
import { SafeAreaView, View, Text } from 'react-native';
import Logo from '@/components/Logo';
import TextField from '@/components/TextField';
import AppButton from '@/components/AppButton';
import { Redirect } from 'expo-router';
import Loading from '@/components/Loading';
import { useForm } from '@/hooks/useForm';
import { useUserManipulation } from '@/hooks/useUserManipulation';

export default function AddEmail() {
  const { isLoaded, user } = useUser();
  if (!isLoaded) return <Loading />;
  if (isLoaded && !user?.id) {
    return <Redirect href={'/'} />;
  }
  const {
    password,
    setPassword,
    hidePassword,
    onPressTogglePassword,
    emailAddress,
    setEmailAddress,
  } = useForm();
  const {
    isPasswordCorrect,
    isEmailChange,
    handleChangeEmail,
    verifyPassword,
    verifyPasswordLoading,
    prevEmail,

    changeEmailLoading,
  } = useUserManipulation(user!);

  if (isEmailChange) {
    return <Redirect href={'/profile'} />;
  }

  return (
    <SafeAreaView className="flex h-full w-full justify-center bg-bg-primary px-5">
      <View>
        <Logo />
        <Text className="mb-7 mt-7 font-mbold text-2xl text-tx-primary">Change Email</Text>
      </View>
      <View>
        {isPasswordCorrect && (
          <View>
            <TextField
              placeholder="Your email"
              label="Email"
              onChangeText={(email) => setEmailAddress(email)}
              value={emailAddress}
            />
            <AppButton
              disabled={changeEmailLoading || !emailAddress.trim()}
              text="Change email"
              onPress={async () => await handleChangeEmail(emailAddress, prevEmail)}
            />
          </View>
        )}
        {!isPasswordCorrect && (
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
            <AppButton
              disabled={verifyPasswordLoading || !password.trim()}
              text="Next"
              onPress={async () => await verifyPassword(password)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
