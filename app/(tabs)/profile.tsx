import AppButton from '@/components/AppButton';
import TextField from '@/components/TextField';
import { View, Text, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useUser } from '@clerk/clerk-expo';
import ListHeader from '@/components/ListHeader';
import { router } from 'expo-router';
import { useForm } from '@/hooks/useForm';
import { useUserManipulation } from '@/hooks/useUserManipulation';
import Loading from '@/components/Loading';
import DeleteAccountModal from '@/components/DeleteAccountModal';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <Loading />;
  const { password, onPressTogglePassword, hidePassword, setPassword, firstName, setFirstName } =
    useForm({ firstNameInput: user?.username || '' });
  const {
    password: newPassword,
    onPressTogglePassword: onPressToggleNewPassword,
    hidePassword: hideNewPassword,
    setPassword: setNewPassword,
  } = useForm();
  const {
    handleLogout,
    pickImage,
    imageUriUi,
    handleUpdateUser,
    handleUpdatePassword,
    updatePasswordLoading,
    updateUserLoading,
    logoutLoading,
    deleteAccount,
    deleteUserLoading,
    isPasswordUpdated,
  } = useUserManipulation(user!);
  const [openModal, setOpenModal] = useState(false);

  if (logoutLoading) return <Loading />;

  useEffect(() => {
    setPassword('');
    setNewPassword('');
  }, [isPasswordUpdated]);

  return (
    <SafeAreaView className="h-full w-full bg-bg-primary p-5">
      <ListHeader onPress={() => router.push(`home`)} title="Account Settings" isLeft={true} />
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View className="mt-4">
          <Pressable
            onPress={handleLogout}
            className="absolute right-0 top-1 flex flex-row rounded-full bg-[#00000041] px-3 py-2"
          >
            <Text className="mr-2 text-sm text-tx-primary">Log out</Text>
            <FontAwesome name="arrow-circle-right" size={20} color={'#fff'} />
          </Pressable>
          <Pressable
            className="relative mx-auto my-0 h-[150px] w-[150px] overflow-hidden rounded-full bg-bg-secondary"
            onPress={pickImage}
          >
            {imageUriUi && (
              <Image source={{ uri: imageUriUi }} className="h-full w-full rounded-full" />
            )}
            <View className="absolute bottom-2 right-2 flex items-start justify-start rounded-full bg-[#00000041] px-4 py-2">
              <FontAwesome name="photo" size={20} color={'#fff'} />
            </View>
          </Pressable>
          <View className="mt-3">
            <TextField
              placeholder="Your username"
              label="Username"
              onChangeText={(firstName) => setFirstName(firstName)}
              value={firstName}
            />
            <AppButton
              text="Update Profile"
              onPress={async () => await handleUpdateUser(firstName)}
              disabled={updateUserLoading || !firstName.trim()}
            />
            <View>
              <Text className="my-4 font-msemibold text-lg text-tx-primary">Change Email</Text>
              <Pressable onPress={() => router.push('/update-email')}>
                <TextField
                  editable={false}
                  placeholder="Your email"
                  label="Email"
                  value={user?.emailAddresses[0].emailAddress || ''}
                  iconName="pencil"
                  withIcon
                />
              </Pressable>
            </View>
            <View>
              <Text className="my-4 font-msemibold text-lg text-tx-primary">Change Password</Text>
              <TextField
                placeholder="Your current password"
                secureTextEntry={hidePassword}
                label="Current Password"
                withIcon
                iconName={hidePassword ? 'eye' : 'eye-slash'}
                onIconPress={onPressTogglePassword}
                onChangeText={(password) => setPassword(password)}
                value={password}
              />
              <TextField
                placeholder="Your new password"
                secureTextEntry={hideNewPassword}
                label="New Password"
                withIcon
                iconName={hidePassword ? 'eye' : 'eye-slash'}
                onIconPress={onPressToggleNewPassword}
                onChangeText={(password) => setNewPassword(password)}
                value={newPassword}
              />
              <AppButton
                disabled={updatePasswordLoading || !password.trim() || !newPassword.trim()}
                text="Update Password"
                onPress={async () => await handleUpdatePassword(password, newPassword)}
              />
            </View>
            <Text className="my-4 font-msemibold text-lg text-red-600">Delete account</Text>
            <TouchableOpacity
              onPress={() => setOpenModal(true)}
              className="w-52 rounded-xl bg-bg-secondary py-2"
            >
              <Text className="text-center font-mregular text-base text-red-600">
                Delete my account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <DeleteAccountModal
          closeModal={() => setOpenModal(false)}
          isOpen={openModal}
          deleteFun={deleteAccount}
          isLoading={deleteUserLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
