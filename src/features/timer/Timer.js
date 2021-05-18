import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { color } from '../../utils/colors';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { fontSizes } from '../../utils/sizes';
const DEFAULT_TIME = 0.1;
export const Timer = ({ focusTitle, onTimerEnd, clearSubject}) => {
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setisStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setisStarted(false);
    onTimerEnd();
  };
  const vibrate = () => {
    if (Platform.OS == 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };
  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setisStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: 100 }}>
        <Text style={styles.title}> Focusing on : </Text>
        <Text style={styles.task}> {focusTitle} </Text>
      </View>
      <View style={{ paddingTop: 5 }}>
        <ProgressBar
          progress={progress}
          color="#5efdde"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View
        style={(styles.buttonWrapper, { marginTop: 20, alignItems: 'center' })}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setisStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setisStarted(false)} />
        )}
        
      </View>
      <View style={styles.clearSubject,{textAlignVertical:"center"}}>
          <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: color.white,
    textAlign: 'center',
    fontSize:fontSizes.md
  },
  task: {
    color: color.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
 
  clearSubject:{
    paddingBottom:10,    
    paddingLeft:30,
   
  }
});
