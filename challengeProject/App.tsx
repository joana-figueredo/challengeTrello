import React from 'react';
import {SafeAreaView} from 'react-native';
import {TaskList} from './src/components/TaskList/TaskList';
import {TaskProvider} from './src/context/TaskContext';

export const App = () => {
  return (
    <TaskProvider>
      <SafeAreaView>
        <TaskList />
      </SafeAreaView>
    </TaskProvider>
  );
};

export default App;
