import { Text } from 'react-native';

const ErrorText = ({ text }: { text: string }) => {
  return <Text className="mt-2 text-center font-mregular text-sm text-red-400">{text}</Text>;
};

export default ErrorText;
