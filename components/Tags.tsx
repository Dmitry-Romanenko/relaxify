import { FlatList, Text, View } from 'react-native';

const Tags = () => {
  return (
    <FlatList
      data={[
        'Breathing Exercises',
        'Body Scan',
        'Visualization',
        'Mindfulness Meditation',
        'Zen Meditation',
      ]}
      horizontal
      renderItem={(item) => (
        <View className="mb-11 mr-2 mt-4 flex h-9 items-center justify-center rounded-2xl bg-bg-secondary px-4">
          <Text className="text-tx-silver">{item.item}</Text>
        </View>
      )}
    />
  );
};

export default Tags;
