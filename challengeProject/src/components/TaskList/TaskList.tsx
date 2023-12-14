import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import {Task} from '../Task/Task';
import data from '../../testHelpers/moks/trello.json';

type Tasks = {
  id: number;
  name: string;
  status: string;
  data: string;
}[];

export const TaskList = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<Tasks>(data);
  const [textName, onChangeTextName] = React.useState('');
  const [textStatus, onChangeTextStatus] = React.useState('');
  const [textData, onChangeTextData] = React.useState('');

  const modalAddNewTask = () => {
    setShowModal(true);
  };

  const addTask = () => {
    tasks.push({
      id: 6,
      data: textData,
      name: textName,
      status: textStatus,
    });
    setShowModal(false);
  };

  const removeCard = (id: number) => {
    const filteredTasks = tasks.filter(item => {
      return item.id !== id;
    });
    setTasks(filteredTasks);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="lightgreen" />
      <View style={styles.header}>
        <Text style={styles.yourTasks}>YOUR TASKS</Text>
      </View>
      <View style={styles.backgroundListCards}>
        <View style={styles.addCard}>
          <TouchableOpacity onPress={modalAddNewTask}>
            <Text style={styles.textAddCard}>Add a card</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {tasks.map(item => (
            <Task
              style={styles.task}
              title={item.name}
              status={item.status}
              date={item.data}
              onPress={() => removeCard(item.id)}
            />
          ))}
        </ScrollView>
      </View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.button}
              onPress={() => setShowModal(!showModal)}>
              <Text style={styles.close}>X</Text>
            </Pressable>
            <Text style={styles.newCard}> Task name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTextName}
              value={textName}
            />
            <Text style={styles.newCard}> Status:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTextStatus}
              value={textStatus}
            />
            <Text style={styles.newCard}> Data:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTextData}
              value={textData}
            />
            <View style={styles.containerCreate}>
              <TouchableOpacity
                style={styles.touchableButtonCreate}
                onPress={addTask}>
                <Text style={styles.textCreate}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    backgroundColor: '#F0D6F9',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingTop: 10,
    paddingRight: 10,
  },
  close: {
    textAlign: 'right',
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newCard: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  containerCreate: {
    alignItems: 'center',
    padding: 7,
  },
  touchableButtonCreate: {
    backgroundColor: '#210440',
    borderRadius: 10,
    width: 130,
    height: 30,
    justifyContent: 'center',
  },
  textCreate: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
