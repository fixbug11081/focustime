import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  console.log(item);
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};
export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        {!!focusHistory.length && (
            <>
                <Text style={styles.title}>Things we have focussed on.</Text>
                <FlatList
                  style={{ flex: 1 }}
                  contentContainerStyle={{ flex: 1, alignItems: 'center' }}
                  data={focusHistory}
                  renderItem={HistoryItem}
                />
            
                <View style={styles.clearContainer}>
                  <RoundedButton 
                  size={90} 
                  title='clear'
                  onPress={()=>onClear()}/>
                </View>
            </>
        )}
      </SafeAreaView>
     </> 
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'candy' : '#DFF0D8',
    fontSize: fontSizes.xl,
    
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.md,
    paddingTop:200,
    marginLeft:5
  },
  clearContainer:{
    alignItems:'center',
    padding:spacing.md
  }
});
