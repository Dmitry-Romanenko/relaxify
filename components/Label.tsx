import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text } from 'react-native';

interface LabelProps {
  label: string;
}

const Label = ({ label }: LabelProps) => {
  const isLabel = (text: string) => {
    return label.toLowerCase().includes(text);
  };
  const isMeditation = isLabel('meditation');
  const isSound = isLabel('sound');
  const isArticle = isLabel('article');
  const bgColor = isMeditation ? '#388E3C' : isSound ? '#0D47A1' : isArticle ? '#AFB42B' : '#ffff';

  return (
    <View className="flex flex-row items-center self-start rounded-2xl bg-[#00000068] px-2 py-1">
      <View
        className="flex h-[14px] w-[14px] items-center justify-center rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        {isMeditation && <FontAwesome name={'leaf'} size={8} color="#ffff" />}
        {isSound && <FontAwesome name={'play'} size={8} color="#ffff" />}
        {isArticle && <FontAwesome name={'info'} size={8} color="#ffff" />}
      </View>
      <Text className="ml-1 text-xs capitalize text-white">{label}</Text>
    </View>
  );
};

export default Label;
