import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text } from 'react-native';

interface CustomToastProps {
  message: string[];
  type: 'error' | 'success';
}

const CustomToast = ({ message, type }: CustomToastProps) => {
  return (
    <View className="min-h-[200px} flex w-[90%] flex-row items-center rounded-xl bg-bg-secondary px-4 py-3">
      <View
        className={`flex h-16 w-16 items-center justify-center rounded-md ${type === 'error' ? 'bg-red-400' : 'bg-green-400'}`}
      >
        <FontAwesome
          name={type === 'error' ? 'warning' : 'check-circle'}
          size={40}
          color={'#fff'}
        />
      </View>
      <View className="ml-4 w-[220px]">
        <Text className="font-msemibold text-sm text-tx-primary">
          {type === 'error' ? 'An Error Happened' : 'Success'}
        </Text>
        <View className="mt-1 flex flex-col text-sm">
          {message.map((msg, idx) => (
            <Text key={idx} className="font-mregular text-xs text-tx-secondary">
              — {msg}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CustomToast;
