import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

export type TaskProps = {
  title: string;
  status: string;
  date: string;
  style: {};
};

export const Task = ({title, status, date, style}: TaskProps) => {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0D6F9',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    height: 70,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  status: {
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 1,
  },
  date: {
    fontWeight: '400',
    fontSize: 14,
  },
});
