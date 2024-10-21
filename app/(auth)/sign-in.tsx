import { Link } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Logo from '@/components/Logo';
import TextField from '@/components/TextField';
import AppButton from '@/components/AppButton';
import Loading from '@/components/Loading';
import { useForm } from '@/hooks/useForm';
import { useUserAuth } from '@/hooks/useUserAuth';

export default function SignIn() {
  const { isLoaded, onSignInPress, signInLoading } = useUserAuth();

  const {
    emailAddress,
    password,
    setEmailAddress,
    setPassword,
    onPressTogglePassword,
    hidePassword,
  } = useForm();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex h-full w-full justify-center bg-bg-primary px-5">
      <View>
        <Logo />
        <Text className="mb-7 mt-7 font-mbold text-2xl text-tx-primary">Sign In</Text>
      </View>
      <View>
        <View>
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
            disabled={signInLoading || !emailAddress.trim() || !password.trim()}
            text="Sign In"
            onPress={async () => await onSignInPress(emailAddress, password)}
          />
        </View>
        <View className="mt-5 flex flex-row items-center justify-between">
          <Text className="font-mregular text-xs text-tx-silver">Don't have an account?</Text>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text className="font-msemibold text-xs text-tx-silver underline">Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View className="mt-5 flex flex-row items-center justify-center">
          <Link href="/forgot-password" asChild>
            <TouchableOpacity>
              <Text className="font-msemibold text-xs text-tx-silver underline">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
