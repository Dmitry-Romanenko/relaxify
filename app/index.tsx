import { Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Logo from '@/components/Logo';

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex h-full w-full items-center justify-center bg-bg-primary px-6">
        <View className="flex flex-col items-center justify-center gap-y-7">
          <Logo />
          <Image
            className="h-[300px] w-[300] object-contain"
            source={require('../assets/images/collage.png')}
          />
          <Text className="text-s text-center font-mregular text-base text-tx-secondary">
            Welcome! Take a deep breath and find your center. This space is dedicated to helping you
            find peace and balance. Let’s begin your journey to inner calm.
          </Text>
          <TouchableOpacity
            className="flex h-12 w-52 items-center justify-center rounded-2xl bg-btn-bg"
            onPress={() => router.push('/home')}
          >
            <Text className="font-msemibold text-tx-primary">Start Meditation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
