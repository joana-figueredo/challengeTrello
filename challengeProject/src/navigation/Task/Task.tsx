import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

export const Task = ({title, status, date, style}) => {
  return (
    <View style={[styles.card, style]}>
      <Text>{title}</Text>
      <Text>{status}</Text>
      <Text>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'red',
  },
});
