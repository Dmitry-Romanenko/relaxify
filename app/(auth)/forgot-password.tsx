import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import Logo from '@/components/Logo';
import TextField from '@/components/TextField';
import AppButton from '@/components/AppButton';
import Loading from '@/components/Loading';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  const onPressTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (!isLoaded) {
    return <Loading />;
  }

  if (isSignedIn) {
    router.push('/');
  }

  async function create() {
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true);
        setError('');
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function reset() {
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
          setError('');
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <SafeAreaView className="flex h-full w-full justify-center bg-bg-primary px-5">
      <View>
        <Logo />
        <Text className="mb-7 mt-7 font-mbold text-2xl text-tx-primary">Forgot Password?</Text>
      </View>
      <View>
        {!successfulCreation && (
          <View>
            <TextField
              placeholder="Your email"
              label="Email"
              onChangeText={(email) => setEmail(email)}
              value={email}
            />
            <AppButton text="Send password reset code" onPress={create} />
          </View>
        )}
        {successfulCreation && (
          <View>
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
            <TextField
              placeholder="Code..."
              label="Code"
              onChangeText={(code) => setCode(code)}
              value={code}
            />
            <AppButton text="Reset" onPress={reset} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
