import React, {createContext, useContext, useState} from 'react';
import data from '../testHelpers/moks/trello.json';

export const TaskContext = createContext({});

type Tasks = {
  id: number;
  name: string;
  status: string;
  data: string;
}[];

export const TaskProvider = ({children}) => {
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
  const addTask = () => {
    const maxId = Math.max(...tasks.map(task => task.id), 0); //vejo com o id maior
    const newId = maxId + 1;
    tasks.unshift({
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
    <TaskContext.Provider
      value={{
        modalAddNewTask,
        addTask,
        isEditing,
        tasks,
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
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
