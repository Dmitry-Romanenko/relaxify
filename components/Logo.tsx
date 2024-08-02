import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text } from 'react-native';

const Logo = () => {
  return (
    <View className="flex flex-row items-center gap-x-4">
      <FontAwesome name="pagelines" size={100} color="#2E7D32" />
      <Text className="text-s font-mbold text-2xl uppercase text-tx-primary">Relaxify</Text>
    </View>
  );
};

export default Logo;
