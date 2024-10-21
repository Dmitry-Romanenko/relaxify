import { View, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <View className="flex h-full w-full flex-col items-center justify-center bg-bg-primary px-2 py-4">
      <ActivityIndicator size="large" color={'#00838f'} />
    </View>
  );
};

export default Loading;
