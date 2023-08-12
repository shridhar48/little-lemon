import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { isArray } from 'lodash';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Initials } from '../components';

import {
  getItemFromAsyncStorage,
  saveItemToAsyncStorage,
  validateEmail,
  validateName,
} from '../shared/utils';
import { CONSTANTS } from '../shared/constants';

import styles from './profileStyles';

const { ASYNC_STORAGE_CONSTANTS, PROFILE_MODEL, SCREENS } = CONSTANTS;

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [profileImgUrl, setProfileImgUrl] = useState('');
  const [notificationPreference, setNotificationPreference] = useState(
    PROFILE_MODEL.notificationPreference
  );

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      init();
    }, [])
  );

  const init = async () => {
    let profileObj =
      (await getItemFromAsyncStorage(ASYNC_STORAGE_CONSTANTS.PROFILE)) ||
      PROFILE_MODEL;

    if (profileObj) {
      profileObj = JSON.parse(profileObj);

      setFirstName(profileObj?.firstName);
      setLastName(profileObj?.lastName);
      setEmail(profileObj?.email);
      setProfileImgUrl(profileObj?.profileImgUrl);
      setPhoneNo(profileObj?.phoneNo);

      if (isArray(profileObj?.notificationPreference)) {
        setNotificationPreference(profileObj?.notificationPreference);
      }
    }
  };

  const updateProfile = async (imageUrl = '') => {
    const profileObj = { ...PROFILE_MODEL };

    profileObj.firstName = firstName;
    profileObj.lastName = lastName;
    profileObj.email = email;
    profileObj.profileImgUrl = imageUrl;
    profileObj.phoneNo = phoneNo;
    profileObj.notificationPreference = notificationPreference;

    await saveItemToAsyncStorage(
      ASYNC_STORAGE_CONSTANTS.PROFILE,
      JSON.stringify(profileObj)
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImgUrl(result.assets[0].uri);

      updateProfile(result.assets[0].uri);
    }
  };

  const logOut = async () => {
    await saveItemToAsyncStorage(
      ASYNC_STORAGE_CONSTANTS.PROFILE,
      JSON.stringify(PROFILE_MODEL)
    );
    await saveItemToAsyncStorage(ASYNC_STORAGE_CONSTANTS.LOGGED_IN, 'false');

    navigation.navigate(SCREENS.ONBOARDING);
  };

  const validateInput = () => {
    const isValidFirstName = validateName(firstName);
    const isValidEmail = validateEmail(email);

    if (isValidFirstName && isValidEmail) {
      console.log('Valid inputs updating profile');
      updateProfile(profileImgUrl);
    } else {
      console.log('Invalid inputs');

      Alert.alert('Please enter correct firstname and email');
    }
  };

  const getProfileImage = (profileView = false) => {
    if (profileImgUrl) {
      return (
        <Image
          source={{ uri: profileImgUrl }}
          resizeMode='contain'
          style={
            profileView
              ? { height: 80, width: 80, borderRadius: 80 / 2 }
              : { height: 50, width: 50, borderRadius: 50 / 2 }
          }
        />
      );
    } else {
      return (
        <Initials
          profileView={profileView}
          firstName={firstName}
          lastName={lastName}
        />
      );
    }
  };

  const updateCheckBox = (selectedKey) => {
    const updatedNotificationPreferences = notificationPreference.map(
      ({ key, label, isSelected }) => {
        if (key === selectedKey) {
          const updatedObj = { key, label, isSelected: !isSelected };

          return updatedObj;
        }

        return { key, label, isSelected };
      }
    );

    setNotificationPreference(updatedNotificationPreferences);
  };

  renderCheckBox = () => {
    return (
      <View style={styles.checkBoxContainer}>
        {notificationPreference.map(({ key, label, isSelected }) => {
          return (
            <View key={key} style={styles.checkBoxRow}>
              <Pressable
                style={isSelected ? styles.selected : styles.unselected}
                onPress={() => {
                  updateCheckBox(key);
                }}
              >
                {isSelected ? (
                  <Ionicons name='checkmark' size={10} color='white' />
                ) : (
                  <View />
                )}
              </Pressable>
              <Text style={styles.checkBoxLabel}>{label}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButtonContainer}>
          <Ionicons name='arrow-back' size={25} color='white' />
        </Pressable>
        <Image
          source={require('../assets/images/Logo.png')}
          resizeMode='contain'
        />
        {getProfileImage()}
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        style={styles.containerStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Text style={styles.mainText}>Personal Information</Text>
        <Text style={styles.subLabel}>Avatar</Text>
        <View style={styles.profilePictureView}>
          {getProfileImage(true)}
          <Pressable
            style={styles.changeButton}
            onPress={() => {
              pickImage();
            }}
          >
            <Text style={styles.buttonLabel}>Change</Text>
          </Pressable>
          <Pressable style={styles.removeButton}>
            <Text style={styles.buttonLabel1}>Remove</Text>
          </Pressable>
        </View>
        <Text style={styles.subLabel}>First Name</Text>
        <TextInput
          style={styles.profileTextInput}
          cursorColor={'gray'}
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
          }}
        />
        <Text style={styles.subLabel}>Last Name</Text>
        <TextInput
          style={styles.profileTextInput}
          cursorColor={'gray'}
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
          }}
        />
        <Text style={styles.subLabel}>Email</Text>
        <TextInput
          style={styles.profileTextInput}
          cursorColor={'gray'}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text style={styles.subLabel}>Phone Number</Text>
        <TextInput
          style={styles.profileTextInput}
          keyboardType='number-pad'
          cursorColor={'gray'}
          value={phoneNo}
          onChangeText={(text) => {
            setPhoneNo(text);
          }}
        />
        <Text style={styles.mainText}>Email Notifications</Text>
        {renderCheckBox()}
        <Pressable
          style={styles.logOutButton}
          onPress={() => {
            logOut();
          }}
        >
          <Text style={styles.mainText2}>Log out</Text>
        </Pressable>
        <View style={styles.bottomButtonContainer}>
          <Pressable
            style={styles.discardButton}
            onPress={() => {
              init();
            }}
          >
            <Text style={styles.buttonLabel1}>Discard</Text>
          </Pressable>
          <Pressable
            style={styles.saveButton}
            onPress={() => {
              validateInput();
            }}
          >
            <Text style={styles.buttonLabel}>Save Changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
