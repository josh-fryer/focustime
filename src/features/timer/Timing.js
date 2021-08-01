import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChangeTime }) => (
  <View style={styles.buttonContainer}>
    <View style={styles.timingButton}>
      <RoundedButton size={75} title="10" onPress={() => onChangeTime(10)} />
    </View>
    <View style={styles.timingButton}>
      <RoundedButton size={75} title="15" onPress={() => onChangeTime(15)} />
    </View>
    <View style={styles.timingButton}>
      <RoundedButton size={75} title="20" onPress={() => onChangeTime(20)} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 15,
    paddingBottom: 15,
  },
  timingButton: {
    flex: 1,
    alignItems: 'center',
  },
});
