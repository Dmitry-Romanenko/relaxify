import { View, Text } from 'react-native';
import Chevron from './Chevron';

interface ListHeaderProps {
  title: string;
  subtitle?: string;
  isLeft?: boolean;
  onPress: () => void;
}

const ListHeader = ({ title, subtitle, isLeft = false, onPress }: ListHeaderProps) => {
  return (
    <View className="mb-3 flex flex-row items-center justify-between px-2">
      {isLeft && <Chevron onPress={onPress} isLeft={isLeft} />}
      <View
        className={`w-[80%] ${isLeft && 'flex items-start justify-center'} flex flex-col gap-y-1`}
      >
        <Text className="font-msemibold text-lg text-tx-primary">{title}</Text>
        {subtitle && <Text className="font-mregular text-xs text-tx-secondary">{subtitle}</Text>}
      </View>
      {!isLeft && <Chevron onPress={onPress} isLeft={isLeft} />}
    </View>
  );
};

export default ListHeader;
