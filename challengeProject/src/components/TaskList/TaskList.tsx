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
  const [showModal, setShowModal] = useState(false); //visibilidade do modal
  const [tasks, setTasks] = useState<Tasks>(data); // armazena o array de tarefas, recebe os dados do json
  const [taskId, setTaskId] = useState(0);
  const [textName, onChangeTextName] = React.useState('');
  const [textStatus, onChangeTextStatus] = React.useState('');
  const [textData, onChangeTextData] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);

  //função para mostrar o modal
  const modalAddNewTask = () => {
    setShowModal(true);
  };
  //função de adicionar task
  const addTask = () => {
    const maxId = Math.max(...tasks.map(task => task.id), 0); //vejo com o id maior
    const newId = maxId + 1;
    tasks.push({
      id: newId,
      data: textData,
      name: textName,
      status: textStatus,
    });
    setShowModal(false); // fecha a modal
  };
  //funcao de remover task
  const removeCard = (id: number) => {
    //riar um novo array que contém apenas os elementos do array original que não possue o mesmo id do id
    const filteredTasks = tasks.filter(item => {
      return item.id !== id;
    });
    setTasks(filteredTasks);
  };
  //funcao de editar task
  const editCard = (id: number) => {
    //modal está sendo usado para editar uma tarefa, não para adicionar uma nova.
    setIsEditing(true);
    //método find para procurar em tasks o id corresponde ao id
    const taskToEdit = tasks.find(task => task.id === id);
    //ae foi encontrado o id
    if (taskToEdit) {
      //abre o modal de edição
      setShowModal(true);
      setTaskId(id);
      onChangeTextName(taskToEdit.name);
      onChangeTextStatus(taskToEdit.status);
      onChangeTextData(taskToEdit.data);
    }
  };
  //funcao de update task
  const updateTask = () => {
    //método findIndex para encontrar o indice da tarefa no array
    const index = tasks.findIndex(task => task.id === taskId);
    //cópia do array tasks
    const updatedTasks = [...tasks];
    //atualiza o status da task no array
    updatedTasks[index].status = textStatus;
    //atualiza o tasks com a alteração
    setTasks([...updatedTasks]);
    setShowModal(false);
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
