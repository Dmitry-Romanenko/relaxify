import { IListCard } from '@/types/listCard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ImageBackground, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

const ListCard = ({ card }: { card: IListCard }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.9}
      onPress={() => undefined}
      underlayColor="#ffff"
      className="mr-2 h-[200px] w-[200px] overflow-hidden rounded-3xl"
    >
      <ImageBackground className="h-full w-full object-cover" source={card.imgUrl}>
        <View className="flex h-full w-full flex-col justify-between bg-[#00000063] px-2 py-4">
          <View className="flex flex-row items-center self-start rounded-2xl bg-[#00000068] px-2 py-1">
            <FontAwesome name="play-circle" size={12} color="#00838f" />
            <Text className="ml-2 text-xs text-white">Sounds</Text>
          </View>
          <View>
            <View className="flex flex-row items-center self-start rounded-2xl bg-[#00000068] px-2 py-1">
              <FontAwesome name="clock-o" size={12} color="#ffff" />
              <Text className="ml-2 text-xs text-white">{card.duration} min</Text>
            </View>
            <Text className="ml-1 mt-[2px] text-sm text-white">{card.title}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableHighlight>
  );
};

export default ListCard;
