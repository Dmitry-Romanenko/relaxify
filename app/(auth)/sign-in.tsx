import { useSignIn } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import TextField from '@/components/TextField';
import AppButton from '@/components/AppButton';
import Loading from '@/components/Loading';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onPressTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  if (!isLoaded) {
    return <Loading />;
  }

  const onSignInPress = React.useCallback(async () => {
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/home');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

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
            secureTextEntry={showPassword}
            label="Password"
            withIcon
            iconName={showPassword ? 'eye' : 'eye-slash'}
            onIconPress={onPressTogglePassword}
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
          <AppButton text="Sign In" onPress={onSignInPress} />
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
