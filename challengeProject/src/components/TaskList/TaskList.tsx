import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Task} from '../Task/Task';
import data from '../../testHelpers/moks/trello.json';

export const TaskList = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="lightgreen" />
      <View style={styles.header}>
        <Text style={styles.yourTasks}>YOUR TASKS</Text>
      </View>
      <View style={styles.backgroundListCards}>
        <View style={styles.addCard}>
          <TouchableOpacity>
            <Text style={styles.textAddCard}>Add a card</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {data.map(item => (
            <Task
              style={styles.task}
              title={item.name}
              status={item.status}
              date={item.data}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#210440',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    backgroundColor: '#F0D6F9',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    shadowColor: '#56406E',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,

    elevation: 24,
    padding: 20,
  },
  yourTasks: {
    color: '#210440',
    fontWeight: '800',
    fontSize: 40,
    textAlign: 'center',
  },
  backgroundListCards: {
    backgroundColor: '#FFFFFF60',
    flex: 1,
    margin: 15,
  },
  addCard: {
    backgroundColor: '#F0D6F9',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    height: 30,
  },
  textAddCard: {
    textAlign: 'center',
    color: 'black',
  },
  task: {
    marginTop: 2,
  },
});
