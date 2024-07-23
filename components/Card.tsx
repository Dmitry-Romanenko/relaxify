import { ICard } from '@/types/card';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ImageBackground, View, Text } from 'react-native';

const Card = ({
  card,
  icon,
  iconColor,
}: {
  card: ICard;
  icon: 'leaf' | 'play' | 'info';
  iconColor: string;
}) => {
  return (
    <ImageBackground className="h-full w-full object-cover" source={{ uri: card.imgUrl }}>
      <View className="flex h-full w-full flex-col justify-between bg-[#00000063] px-2 py-4">
        <View className="flex flex-row items-center self-start rounded-2xl bg-[#00000068] px-2 py-1">
          <View
            className="flex h-[14px] w-[14px] items-center justify-center rounded-full"
            style={{ backgroundColor: iconColor }}
          >
            <FontAwesome name={icon} size={8} color="#ffff" />
          </View>
          <Text className="ml-1 text-xs capitalize text-white">{card.label}</Text>
        </View>
        <View>
          <View className="flex flex-row items-center self-start rounded-2xl bg-[#00000068] px-2 py-1">
            <FontAwesome name="clock-o" size={12} color="#ffff" />
            <Text className="ml-1 text-xs text-white">{card.duration} min.</Text>
          </View>
          <Text className="ml-1 mt-[2px] text-sm text-white">{card.title}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Card;
