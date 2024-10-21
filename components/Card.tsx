import { ICard } from '@/types/card';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { ImageBackground, View, Text, Pressable } from 'react-native';
import Label from './Label';
import { getSoundOrArticleDuration } from '@/utils/getSoundOrArticleDuration';

interface CardProps {
  card: ICard;
  onPress: () => void;
}

const Card = ({ card, onPress }: CardProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <ImageBackground
        className="relative h-full w-full object-cover"
        source={{ uri: card.img.url }}
      >
        {isPressed && <View className="absolute z-[1] h-full w-full bg-[#dddddd1c]" />}

        <View className="flex h-full w-full flex-col justify-between bg-[#00000041] px-2 py-4">
          <Label label={card.label} />
          <View>
            <View className="flex flex-row items-center self-start rounded-2xl bg-[#00000068] px-2 py-1">
              <FontAwesome name="clock-o" size={12} color="#ffff" />
              <Text className="ml-1 text-xs text-white">{getSoundOrArticleDuration(card)}</Text>
            </View>
            <Text className="ml-1 mt-[2px] text-sm text-white">{card.title}</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default Card;
