import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '@/components/TextField';
import { useState } from 'react';
import Logo from '@/components/Logo';
import AppButton from '@/components/AppButton';
import Loading from '@/components/Loading';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  if (!isLoaded) {
    return <Loading />;
  }
  const onPressTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSignUpPress = async () => {
    try {
      await signUp.create({
        username: firstName,
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/home');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

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
              secureTextEntry={showPassword}
              label="Password"
              withIcon
              iconName={showPassword ? 'eye' : 'eye-slash'}
              onIconPress={onPressTogglePassword}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
            <AppButton text="Sign Up" onPress={onSignUpPress} />

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
            <AppButton text="Verify Email" onPress={onPressVerify} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
