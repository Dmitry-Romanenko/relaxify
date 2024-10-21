import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface ProfileButtonProps {
  username: string;
  imageUrl: string;
}

const ProfileButton = ({ imageUrl, username }: ProfileButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`profile`)}
      className="absolute left-4 top-4 z-20"
    >
      <View className="flex flex-row items-center rounded-2xl bg-[#00000041] px-3 py-2">
        <Image source={{ uri: imageUrl }} className="h-8 w-8 rounded-full" />
        <View className="ml-2">
          <Text className="text-sm capitalize text-tx-primary">Hello, {username}</Text>
          <View className="mt-1 flex flex-row items-end gap-x-1">
            <Text className="text-xs text-tx-primary">Go to profile settings</Text>
            <FontAwesome name="chevron-right" size={13} color={'#fff'} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileButton;
