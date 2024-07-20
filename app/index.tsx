import { Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text className="font-mlight text-lg">Init</Text>
      <FontAwesome name={'compass'} size={22} />
    </View>
  );
}
