import React from 'react';

import {
  // StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  // ViewStyle,
} from 'react-native';

// type StylesType = StyleProp<ViewStyle>;
// const styles: StylesType = {};

export type TaskProps = {
  title: string;
  status: string;
  date: string;
  onRemove: () => void;
  onEdit: () => void;
};

export const Task = ({title, status, date, onRemove, onEdit}: TaskProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.right}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.status}>Status: {status}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.left}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemove}>
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
