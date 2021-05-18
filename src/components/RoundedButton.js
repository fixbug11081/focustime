import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { color } from '../utils/colors';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 100,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text style={[styles(size).text]} onPress={props.onPress}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 5,
      textAlign:"center"
    },
    text: {
      color: color.white,      
      fontSize: fontSizes.lg,
      textAlignVertical:"center",
      paddingTop: 12,      
      fontWeight: 'bold'
    },
  });
