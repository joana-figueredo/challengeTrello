import React, {useEffect, useState} from 'react';

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
import {useTaskContext} from '../../context/TaskContext';
import data from '../../testHelpers/moks/trello.json';
import {FilterButton} from '../FilterButton/FilterButton';

export const TaskList = () => {
  const {
    modalAddNewTask,
    addTask,
    isEditing,
    removeCard,
    showModal,
    editCard,
    updateTask,
    setShowModal,
    onChangeTextStatus,
    textName,
    onChangeTextData,
    textData,
    onChangeTextName,
    textStatus,
  } = useTaskContext();
  const [filtered, setFiltered] = useState(data);
  const [filterSelected, setFilterSelected] = useState('all');

  useEffect(() => {
    filterList();
  }, [filterSelected]);

  const filterList = () => {
    if (filterSelected === 'all') {
      setFiltered(data);
    } else {
      const itens = data.filter(item => item.status === filterSelected);
      setFiltered(itens);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="lightgreen" />
      <View style={styles.header}>
        <Text style={styles.yourTasks}>YOUR TASKS</Text>
      </View>
      <View style={styles.containerOptions}>
        <FilterButton
          label={'All'}
          color={'#2E2635'}
          isSelected={filterSelected === 'All'}
          onPress={() => setFilterSelected('all')}
        />
        <FilterButton
          label={'To do'}
          color={'#2E2635'}
          isSelected={filterSelected === 'To do'}
          onPress={() => setFilterSelected('To do')}
        />
        <FilterButton
          label={'In Progress'}
          color={'#2E2635'}
          isSelected={filterSelected === 'In Progress'}
          onPress={() => setFilterSelected('In Progress')}
        />
        <FilterButton
          label={'Done'}
          color={'#2E2635'}
          isSelected={filterSelected === 'Done'}
          onPress={() => setFilterSelected('Done')}
        />
      </View>
      <View style={styles.backgroundListCards}>
        <View style={styles.addCard}>
          <TouchableOpacity onPress={modalAddNewTask}>
            <Text style={styles.textAddCard}>Add a card</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {filtered.map(item => (
            <Task
              title={item.name}
              status={item.status}
              date={item.data}
              onRemove={() => removeCard(item.id)}
              onEdit={() => editCard(item.id)}
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
              editable={!isEditing}
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
              editable={!isEditing}
            />
            <View style={styles.containerCreate}>
              <TouchableOpacity
                style={styles.touchableButtonCreate}
                onPress={() => (isEditing ? updateTask() : addTask())}>
                <Text style={styles.textCreate}>
                  {isEditing ? 'Save' : 'Create'}
                </Text>
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
  containerOptions: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textToDo: {
    marginHorizontal: 10,
    fontWeight: '600',
    color: '#F0D6F9',
  },
  textInProgress: {
    marginHorizontal: 10,
    fontWeight: '600',
    color: '#F0D6F9',
  },
  textDone: {
    marginHorizontal: 10,
    fontWeight: '600',
    color: '#F0D6F9',
  },
  backgroundListCards: {
    backgroundColor: '#FFFFFF60',
    flex: 1,
    margin: 12,
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
