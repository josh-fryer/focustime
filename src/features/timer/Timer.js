import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing, fontSizes } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const interval = React.useRef(null);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  {/* vibrate phone*/}
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(2000);
    }
  }

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      <View style={{ padding: 50 }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
    </View>
      <View>
        <ProgressBar
          progress={progress}
          color="#5e84e2"
          style={{ height: 10 }}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper({ flex: 0.3 })}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252250",
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.xl,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: ({
    flex = 0.25,
    padding = 15,
    justifyContent = "center",
  } = {}) => ({
    flex,
    flexDirection: "row",
    alignItems: "center",
    justifyContent,
    padding,
  }),
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
