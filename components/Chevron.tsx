import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const Chevron = ({ isLeft = true }: { isLeft?: boolean }) => {
  const iconName = isLeft ? 'chevron-left' : 'chevron-right';
  return (
    <TouchableOpacity className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-bg-secondary">
      <FontAwesome name={iconName} size={15} color="#fff" />
    </TouchableOpacity>
  );
};

export default Chevron;
