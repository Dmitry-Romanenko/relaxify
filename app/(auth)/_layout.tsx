import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useRoute } from '@react-navigation/native';

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const route = useRoute();

  // @ts-ignore
  if (isSignedIn && route.params?.screen !== 'update-email') {
    return <Redirect href={'/home'} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
