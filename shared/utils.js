import AsyncStorage from '@react-native-async-storage/async-storage';
import { isString } from 'lodash';

const validateName = (name) => {
  let isValidName = false;

  if (name) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    isValidName = nameRegex.test(name);
  }

  return isValidName;
};

const validateEmail = (email) => {
  let isValidEmail = false;

  if (email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    isValidEmail = emailRegex.test(email);
  }

  return isValidEmail;
};

const saveItemToAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn('utils.js saveItemToAsyncStorage error :', e);
    // saving error
  }
};

const getItemFromAsyncStorage = async (key) => {
  let value = null;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (e) {
    console.warn('utils.js getItemFromAsyncStorage error :', e);
    // error reading value
  }

  return value;
};

const getUserInitials = (firstName = '', lastName = '') => {
  const firstNameIn = firstName.charAt(0).toUpperCase();
  const lastNameIn = lastName.charAt(0).toUpperCase();

  return firstNameIn + lastNameIn;
};

export {
  validateName,
  validateEmail,
  saveItemToAsyncStorage,
  getItemFromAsyncStorage,
  getUserInitials,
};
