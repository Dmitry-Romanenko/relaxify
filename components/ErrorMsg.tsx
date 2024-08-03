import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorMsgProps {
  retryFun: () => void;
}

const ErrorMsg = ({ retryFun }: ErrorMsgProps) => {
  return (
    <View className="flex h-full w-full items-center justify-center bg-bg-primary px-2">
      <View className="flex w-[300px] flex-col items-center justify-center gap-y-5">
        <FontAwesome name="chain-broken" size={50} color="#F5B7B1" />
        <Text className="text-center font-mbold text-2xl text-tx-primary">
          We encountered a minor issue
        </Text>
        <Text className="text-center font-mregular text-lg text-tx-secondary">
          Please check your internet connection and try again
        </Text>
        <Text className="text-center font-mregular text-base text-tx-secondary">
          If the problem persists, contact our support team for assistance.
        </Text>
        <TouchableOpacity
          className="flex h-10 w-32 items-center justify-center rounded-2xl bg-btn-bg"
          onPress={retryFun}
        >
          <Text className="font-msemibold text-tx-primary">Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorMsg;
