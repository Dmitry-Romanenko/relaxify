import { useUser } from '@clerk/clerk-expo';
import { SafeAreaView, View, Text } from 'react-native';
import Logo from '@/components/Logo';
import TextField from '@/components/TextField';
import AppButton from '@/components/AppButton';
import { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import ClerkService from '@/services/ClerkService';

export default function AddEmail() {
  const { isLoaded, user } = useUser();
  const [email, setEmail] = useState('');
  const [prevEmail, setPrevEmail] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isEmailChange, setIsEmailChange] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onPressTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (!isLoaded) return <Loading />;

  if (isLoaded && !user?.id) {
    router.replace('/');
    return;
  }

  if (successful) {
    router.replace('/profile');
  }

  useEffect(() => {
    setPrevEmail(user.emailAddresses[0].id);
  }, [user]);

  const handleChangeEmail = async () => {
    try {
      await ClerkService.createUserEmail(user.id, email);
      await ClerkService.deleteUserEmail(prevEmail);
      await user.reload();
      setSuccessful(true);
      setIsEmailChange(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const verifyPassword = useCallback(async () => {
    try {
      await ClerkService.verifiyUserPassword(user.id, password);
      setIsPasswordCorrect(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, password]);

  return (
    <>
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
                onChangeText={(email) => setEmail(email)}
                value={email}
              />
              <AppButton text="Change email" onPress={handleChangeEmail} />
              {isEmailChange && <Text>Done</Text>}
            </View>
          )}
          {!isPasswordCorrect && (
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
              <AppButton text="Next" onPress={verifyPassword} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
