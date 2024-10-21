import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import TextField from './TextField';
import AppButton from './AppButton';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface DeleteAccountModalProps {
  isOpen: boolean;
  deleteFun: (confirm: string, restrict: string) => Promise<void>;
  isLoading: boolean;
  closeModal: () => void;
}

const DeleteAccountModal = ({
  isOpen,
  isLoading,
  deleteFun,
  closeModal,
}: DeleteAccountModalProps) => {
  const [confirm, setConfirm] = useState('');

  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <View className="flex h-full w-full items-center justify-center">
        <Pressable className="absolute z-[50] h-full w-full bg-[#33333381]" onPress={closeModal} />
        <View className="relative z-[55] w-[90%] rounded-2xl bg-[#4D4D4D] px-3 py-5">
          <TouchableOpacity
            className="absolute right-3 top-2"
            onPress={closeModal}
            activeOpacity={1}
          >
            <FontAwesome size={20} name="close" color="#ffff" />
          </TouchableOpacity>
          <Text className="mb-2 mt-1 font-msemibold text-base text-tx-primary">
            Are You Sure You Want to Delete Your Account?
          </Text>
          <Text className="mb-2 font-mregular text-sm text-tx-secondary">
            Deleting your account is a permanent action that cannot be undone. If you're sure you
            want to proceed, please confirm below. Otherwise, you can cancel and return to your
            profile settings.
          </Text>
          <Text className="mb-4 font-msemibold text-sm text-tx-primary">
            To verify, <Text className="font-mregular">Delete</Text> type below:
          </Text>
          <TextField
            placeholder="Delete"
            onChangeText={(text) => setConfirm(text)}
            value={confirm}
          />
          <AppButton
            disabled={Boolean(confirm !== 'Delete') || isLoading}
            text="Delete"
            onPress={async () => await deleteFun(confirm, 'Delete')}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;
