import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Constants from 'expo-constants';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';

export const Focus = ({ addTitle }) => {
  const [tmpItem, setTmpItem] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on ?</Text>
      </View>
      <View  style={styles.inputContainer}>
        <TextInput style={styles.txt}         
          onSubmitEditing={({ nativeEvent }) => {
            setTmpItem(nativeEvent.text);
          }}
        />
        <RoundedButton        
          size={70}
          title="+"
          onPress={() => addTitle(tmpItem)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'center',
   
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.md,
    marginTop:40
  },
  inputContainer: {    
    paddingTop: 5,
    paddingLeft:10,
    flexDirection: 'row',
    alignItems: 'center',    
  },
  txt:{
    width:250, 
    paddingLeft:30,
    marginRight:20 
  },

 
});
