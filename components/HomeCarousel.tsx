import { View, Text, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { TAppDataArr } from '@/types/shared';
import Label from './Label';
import Carousel from 'react-native-reanimated-carousel';

const HomeCarousel = ({ data }: { data: TAppDataArr }) => {
  const width = Dimensions.get('window').width;

  return (
    <Carousel
      loop
      width={width - 32}
      height={370}
      data={data}
      autoPlay={true}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <ImageBackground source={{ uri: item.imgUrl }} className="h-full w-full">
          <View className="flex h-full w-full items-center justify-center bg-[#00000041]">
            <View className="flex w-[300px] flex-col items-center justify-center gap-y-3">
              <View>
                <Label label={`new ${item.label}`} />
              </View>
              <Text className="text-center font-msemibold text-lg text-tx-primary">
                {item.title}
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                className="flex h-9 w-32 items-center justify-center rounded-2xl bg-white"
              >
                <Text className="text-center font-mregular text-sm text-black">Explore now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      )}
    />
  );
};

export default HomeCarousel;
