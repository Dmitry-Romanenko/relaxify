import { View, Text } from 'react-native';
import Chevron from './Chevron';

const ListHeader = ({
  title,
  subtitle,
  isLeft = false,
}: {
  title: string;
  subtitle?: string;
  isLeft?: boolean;
}) => {
  return (
    <View className="mb-2 flex flex-row items-center justify-between px-2">
      {isLeft && <Chevron isLeft={isLeft} />}
      <View className={`w-[80%] ${isLeft && 'flex items-center justify-center'}`}>
        <Text className="font-msemibold text-lg text-tx-primary">{title}</Text>
        {subtitle && <Text className="font-mregular text-xs text-tx-secondary">{subtitle}</Text>}
      </View>
      {!isLeft && <Chevron isLeft={isLeft} />}
    </View>
  );
};

export default ListHeader;
