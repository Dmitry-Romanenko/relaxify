import { Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '@/components/TextField';
import Logo from '@/components/Logo';
import AppButton from '@/components/AppButton';
import Loading from '@/components/Loading';
import { useForm } from '@/hooks/useForm';
import { useUserAuth } from '@/hooks/useUserAuth';

export default function SignUp() {
  const {
    isLoaded,
    onSignUpPress,
    signUpLoading,
    onPressVerify,
    pendingVerification,
    verifyEmailLoading,
  } = useUserAuth();
  const {
    code,
    emailAddress,
    firstName,
    onPressTogglePassword,
    password,
    setCode,
    setFirstName,
    setEmailAddress,
    setPassword,
    hidePassword,
  } = useForm();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex h-full w-full justify-center bg-bg-primary px-5">
      <View>
        <Logo />
        <Text className="mb-7 mt-7 font-mbold text-2xl text-tx-primary">Sign Up</Text>
      </View>
      <View>
        {!pendingVerification && (
          <View>
            <TextField
              placeholder="Your username"
              label="Username"
              onChangeText={(firstName) => setFirstName(firstName)}
              value={firstName}
            />

            <TextField
              placeholder="Your email"
              label="Email"
              onChangeText={(email) => setEmailAddress(email)}
              value={emailAddress}
            />

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
              disabled={signUpLoading || !emailAddress.trim() || !password.trim()}
              text="Sign Up"
              onPress={async () => await onSignUpPress(firstName, emailAddress, password)}
            />

            <View className="mt-5 flex flex-row items-center justify-between">
              <Text className="font-mregular text-xs text-tx-silver">Already have an account?</Text>
              <Link href="/sign-in" asChild>
                <TouchableOpacity>
                  <Text className="font-msemibold text-xs text-tx-silver underline">Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        )}
        {pendingVerification && (
          <View>
            <TextField
              placeholder="Code..."
              label="Code"
              onChangeText={(code) => setCode(code)}
              value={code}
            />
            <AppButton
              disabled={verifyEmailLoading || !code.trim()}
              text="Verify Email"
              onPress={async () => await onPressVerify(code)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
