import { View, Text } from 'react-native';
import React from 'react';

import styles from './initialsStyles';

import { getUserInitials } from '../shared/utils';

const Initials = ({ firstName, lastName, profileView = false }) => {
  const initials = getUserInitials(firstName, lastName);

  return (
    <View style={profileView ? styles.container2 : styles.container}>
      <Text style={profileView ? styles.initials2 : styles.initials}>
        {initials}
      </Text>
    </View>
  );
};

export default Initials;
