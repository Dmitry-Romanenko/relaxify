import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/utils/toastConfig';
import { publishableKey, tokenCache } from '@/utils/tokenCache';
import { fonts } from '@/constant/fonts';
import * as ScreenOrientation from 'expo-screen-orientation';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(fonts);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar hidden />
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <RecoilRoot>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
            </Stack>
          </RecoilRoot>
        </ClerkLoaded>
      </ClerkProvider>
      <Toast position="bottom" visibilityTime={3500} config={toastConfig} />
    </>
  );
}
