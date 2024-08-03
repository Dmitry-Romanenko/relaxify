import { TouchableOpacity, Text } from 'react-native';

interface AppButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
}

const AppButton = ({ onPress, text, disabled = false }: AppButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      className={`mt-3 flex h-14 w-full items-center justify-center rounded-2xl ${disabled ? 'bg-[#A9A9A9]' : 'bg-btn-bg'}`}
      onPress={onPress}
    >
      <Text className="font-msemibold text-tx-primary">{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
