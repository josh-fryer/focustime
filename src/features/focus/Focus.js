import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.container}>
          <TextInput
            style={{ flex: 1 }}
            onSubmitEditing={({ nativeEvent }) => {
            setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            style={styles.addSubject}
            size={50}
            title="+"
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleContainer: { flex: 0.5, padding: 16, justifyContent: 'center' },
  title: {
    color: 'white',
    fontWeight: 'bold',
    padding: 16,
    fontSize: fontSizes.lg,
  },
  addSubject: { marginLeft: 10, alignSelf: 'center' },
});
