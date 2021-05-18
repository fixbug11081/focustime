import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { color } from '../utils/colors';

export const minutesToMilliseconds = (min) => min * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minutesToMilliseconds(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
      
        return time;
      }
      const timeleft = time - 1000;

      return timeleft;
    });
  };
  React.useEffect(() => {
    setMillis(minutesToMilliseconds(minutes));
  }, [minutes]);

  React.useEffect(() => {
    onProgress(millis / minutesToMilliseconds(minutes));
    if(millis == 0){
        onEnd();
    }
  }, [millis]);

  React.useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    console.log(interval.current);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View style={{ paddingTop: 200, paddingLeft: 20, paddingRight: 20 }}>
      <Text style={styles.text}>
        {formatTime(minute)} : {formatTime(seconds)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: color.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(192,132,226,0.3)',
  },
});
