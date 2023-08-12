import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {
  validateName,
  validateEmail,
  saveItemToAsyncStorage,
} from '../shared/utils';

import { CONSTANTS } from '../shared/constants';
import styles from './styles';

const { SCREENS, ASYNC_STORAGE_CONSTANTS, PROFILE_MODEL } = CONSTANTS;

const Onboarding = () => {
  const [firstName, setFirstNasme] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const validateInputs = async () => {
    const isValidFirstName = validateName(firstName);
    const isValidEmail = validateEmail(email);

    if (isValidFirstName && isValidEmail) {
      const profileObj = { ...PROFILE_MODEL };

      console.log('Valid inputs');

      profileObj.firstName = firstName;
      profileObj.email = email;

      await saveItemToAsyncStorage(
        ASYNC_STORAGE_CONSTANTS.PROFILE,
        JSON.stringify(profileObj)
      );
      await saveItemToAsyncStorage(ASYNC_STORAGE_CONSTANTS.LOGGED_IN, 'true');

      navigation.navigate(SCREENS.PROFILE);
    } else {
      console.log('Invalid inputs');

      Alert.alert('Please enter correct firstname and email');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/Logo.png')} />
      </View>
      <View style={styles.body}>
        <Text style={styles.mainText}>Let us get to know you</Text>
        <View style={styles.bodyContainer}>
          <View style={styles.textInputViewContainer}>
            <Text style={styles.labelText}>First Name</Text>
            <TextInput
              editable
              multiline
              maxLength={40}
              onChangeText={(text) => {
                setFirstNasme(text);
              }}
              value={firstName}
              style={styles.textInputContainer}
              cursorColor={'black'}
            />
          </View>
          <View style={styles.textInputViewContainer}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              editable
              multiline
              maxLength={40}
              onChangeText={(text) => {
                setEmail(text);
              }}
              keyboardType='email-address'
              value={email}
              style={styles.textInputContainer}
              cursorColor={'black'}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => {
            validateInputs();
          }}
        >
          <Text style={styles.mainText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Onboarding;
