import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

interface AffirmationProps {
  text: string;
}

const Affirmation = ({ text }: AffirmationProps) => {
  return (
    <LinearGradient
      colors={['#fbc2eb', '#a6c1ee']}
      className="flex h-[250px] w-full items-center justify-center rounded-t-2xl"
    >
      <View className="absolute left-4 top-3">
        <FontAwesome size={30} name="star" color="#a6a8ee" />
      </View>

      <View className="absolute bottom-4 right-5">
        <FontAwesome size={22} name="star-o" color="#a6a8ee" />
      </View>

      <View className="absolute left-36 top-10 z-[1]">
        <FontAwesome size={35} name="rocket" color="#a6c1ee" />
      </View>

      <View className="absolute bottom-10 left-7 z-[1]">
        <FontAwesome size={45} name="smile-o" color="#a6a8ee" />
      </View>

      <View className="absolute right-7 top-24 z-[1]">
        <FontAwesome size={42} name="trophy" color="#a6d6ee" />
      </View>

      <View className="absolute right-5 top-2 w-[160px] rounded-2xl bg-[#00000068] py-1">
        <Text className="relative z-[2] text-center font-mregular text-xs capitalize text-tx-primary">
          Your Daily affirmation
        </Text>
      </View>

      <View className="w-[250px]">
        <Text className="relative z-[2] w-[250px] text-center font-msemibold text-base uppercase text-tx-primary">
          {text}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default Affirmation;
