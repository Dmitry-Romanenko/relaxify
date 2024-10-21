import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

interface ChevronProps {
  isLeft?: boolean;
  onPress: () => void;
}

const Chevron = ({ isLeft = true, onPress }: ChevronProps) => {
  const iconName = isLeft ? 'chevron-left' : 'chevron-right';
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-bg-secondary"
    >
      <FontAwesome name={iconName} size={15} color="#fff" />
    </TouchableOpacity>
  );
};

export default Chevron;
