import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface TextFieldProps {
  value: string;
  onChangeText?: (value: string) => void;
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  onIconPress?: () => void;
  withIcon?: boolean;
  iconName?: 'eye' | 'eye-slash' | 'pencil';
  editable?: boolean;
}

const TextField = ({
  value,
  onChangeText,
  label,
  placeholder,
  secureTextEntry = false,
  withIcon = false,
  iconName,
  onIconPress,
  editable = true,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput | null>(null);

  const onPressIcon = () => {
    inputRef.current?.focus();
    onIconPress?.();
  };

  return (
    <View className="mb-4 flex flex-col gap-y-2">
      {label && <Text className="font-msemibold text-sm text-tx-silver">{label}</Text>}
      <View
        className={`${isFocused ? 'border-[1px] border-btn-bg' : 'border-transparent'} flex flex-row items-center rounded-lg ${editable ? 'bg-bg-secondary' : 'bg-[#555555]'} px-3 py-3 font-msemibold text-sm`}
      >
        <TextInput
          editable={editable}
          ref={inputRef}
          secureTextEntry={secureTextEntry}
          className={`flex-1 font-msemibold text-sm ${editable ? 'text-tx-primary' : 'text-tx-silver'}`}
          placeholderTextColor="#9E9E9E"
          autoCapitalize="none"
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {withIcon && (
          <TouchableOpacity onPress={onPressIcon} activeOpacity={1} className="ml-2">
            <FontAwesome name={iconName} color={'#9E9E9E'} size={14} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextField;
