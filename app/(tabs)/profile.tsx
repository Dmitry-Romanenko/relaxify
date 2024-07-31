import AppButton from '@/components/AppButton';
import TextField from '@/components/TextField';
import { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useClerk, getClerkInstance } from '@clerk/clerk-expo';
import ListHeader from '@/components/ListHeader';
import { Link, router } from 'expo-router';
import ErrorText from '@/components/ErrorText';
import * as FileSystem from 'expo-file-system';

export default function Profile() {
  const { signOut, user, client } = useClerk();
  const [firstName, setFirstName] = useState(user?.username || '');
  const [emailAddress, setEmailAddress] = useState(user?.emailAddresses[0].emailAddress || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUriUi, setImageUriUi] = useState<string | null>(user?.imageUrl || null);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageUriUi(result.assets[0].uri);
    }
  };

  const onPressTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onPressToggleNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleUpdatePassword = async () => {
    try {
      setPasswordError(false);
      setLoading(true);
      await user?.updatePassword({ currentPassword: password, newPassword });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setPasswordError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      if (imageUri) {
        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const base64ImageData = `data:image/jpeg;base64,${base64Image}`;
        await user?.setProfileImage({ file: base64ImageData });
        setImageUri(null);
      }
      await user?.update({ firstName });

      // const newEmail = await user?.createEmailAddress({ email: emailAddress });

      // await user?.update({ primaryEmailAddressId: user?.emailAddresses[0].id });
      // await user?.emailAddresses[1].destroy();
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
              onPress={handleUpdateUser}
              disabled={loading || !firstName.trim() || !emailAddress.trim()}
            />
            <View>
              <Text className="my-4 font-msemibold text-lg text-tx-primary">Change Email</Text>
              <Pressable onPress={() => router.push('/add-email')}>
                <TextField
                  editable={false}
                  placeholder="Your email"
                  label="Email"
                  value={emailAddress}
                  iconName="pencil"
                  withIcon
                />
              </Pressable>

              {passwordError && <ErrorText text="Password Update Failed" />}
            </View>
            <View>
              <Text className="my-4 font-msemibold text-lg text-tx-primary">Change Password</Text>
              <TextField
                placeholder="Your current password"
                secureTextEntry={showPassword}
                label="Current Password"
                withIcon
                iconName={showPassword ? 'eye' : 'eye-slash'}
                onIconPress={onPressTogglePassword}
                onChangeText={(password) => setPassword(password)}
                value={password}
              />
              <TextField
                placeholder="Your new password"
                secureTextEntry={showNewPassword}
                label="New Password"
                withIcon
                iconName={showNewPassword ? 'eye' : 'eye-slash'}
                onIconPress={onPressToggleNewPassword}
                onChangeText={(password) => setNewPassword(password)}
                value={newPassword}
              />
              <AppButton
                disabled={loading || !password.trim() || !newPassword.trim()}
                text="Update Password"
                onPress={handleUpdatePassword}
              />
              {passwordError && <ErrorText text="Password Update Failed" />}
            </View>

            <Text className="mt-5 text-center font-mregular text-base text-red-600">
              Delete my account
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
