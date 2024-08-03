import { View, Text, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import Label from './Label';
import Carousel from 'react-native-reanimated-carousel';
import { router } from 'expo-router';

interface HomeCarouselProps {
  data: Array<{ imgUrl: string; label: string; title: string; slug: string }>;
}

const HomeCarousel = ({ data }: HomeCarouselProps) => {
  const width = Dimensions.get('window').width;

  const getUrl = (label: string, slug: string) => {
    const url = label.toLowerCase() === 'article' ? 'article' : 'sound';
    return `/${url}/${slug}`;
  };

  return (
    <Carousel
      loop
      width={width}
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
                onPress={() => router.push(getUrl(item.label, item.slug))}
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
