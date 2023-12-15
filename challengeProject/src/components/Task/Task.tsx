import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export type TaskProps = {
  title: string;
  status: string;
  date: string;
  style: {};
  onPress: () => void;
  onEdit: () => void;
};

export const Task = ({
  title,
  status,
  date,
  style,
  onPress,
  onEdit,
}: TaskProps) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.right}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.status}>Status: {status}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.left}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0D6F9',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  right: {
    paddingVertical: 5,
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
  left: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 5,
  },
  edit: {
    paddingHorizontal: 10,
  },
});
