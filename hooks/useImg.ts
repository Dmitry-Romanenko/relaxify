import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export const useImg = (userImgUrl: string | null) => {
  const [imageUriUi, setImageUriUi] = useState<string | null>(userImgUrl);
  const [imageUri, setImageUri] = useState<string | null>(null);

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

  const convertToBase64 = async (imageUrl: string) => {
    const base64Image = await FileSystem.readAsStringAsync(imageUrl, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64Image}`;
  };

  return {
    pickImage,
    imageUri,
    imageUriUi,
    convertToBase64,
    setImageUri,
    setImageUriUi,
  };
};
