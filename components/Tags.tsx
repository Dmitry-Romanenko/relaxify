import { FlatList, Text, TouchableOpacity } from 'react-native';

const Tags = ({
  tagsList,
  onPress,
  activeTag,
}: {
  tagsList: string[];
  onPress: (tag: string) => void;
  activeTag: string;
}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={['all', ...tagsList]}
      horizontal
      renderItem={(tag) => (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onPress(tag.item)}
          className={`mr-2 mt-4 flex h-9 items-center justify-center rounded-2xl bg-bg-secondary px-4 ${activeTag === tag.item && 'bg-btn-bg'}`}
        >
          <Text className={`capitalize text-white`}>{tag.item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Tags;
