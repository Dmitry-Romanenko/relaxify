import { FlatList, Text, TouchableOpacity } from 'react-native';

interface TagsProps {
  tagsList: string[];
  onPress: (tag: string) => void;
  activeTag: string;
}

const Tags = ({ tagsList, onPress, activeTag }: TagsProps) => {
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
          className={`mr-2 mt-2 flex h-9 items-center justify-center rounded-2xl bg-bg-secondary px-4 ${activeTag === tag.item && 'bg-btn-bg'}`}
        >
          <Text className={`capitalize text-white`}>{tag.item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Tags;
