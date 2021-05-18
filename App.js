import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { color } from './src/utils/colors';
import { fontSizes, spacing } from './src/utils/sizes';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useKeepAwake } from 'expo-keep-awake';

export default function App() {
  {
    useKeepAwake();
  }
  const [focusTitle, setFocusTitle] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const onClear = () => {
    setFocusHistory([]);
  };

  const saveHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch {
      console.log(e);
    }
  };

  const loadHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch {
      console.log(e);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    saveHistory();
  }, [focusHistory]);

  const status = {
    COMPLETE: 1,
    CANCELLED: 2,
  };

  const addFocusHistory = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key:String(focusHistory.length + 1), subject, status },
    ]);
  };
  //console.log(focusHistory);
  return (
    <View style={styles.container}>
      <Text>
        {focusTitle ? (
          <Timer
            focusTitle={focusTitle}
            onTimerEnd={() => {
              addFocusHistory(focusTitle, status.COMPLETE);
              setFocusTitle(null);
            }}
            clearSubject={() => {
              addFocusHistory(focusTitle, status.CANCELLED);
              setFocusTitle(null);
            }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Focus addTitle={setFocusTitle} />
            <FocusHistory focusHistory={focusHistory} onClear={onClear} />
          </View>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.darkblue,
    padding: spacing.lg,
  },
});
