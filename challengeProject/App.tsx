import React from 'react';
import {SafeAreaView} from 'react-native';
import {TaskList} from './src/navigation/TaskList/TaskList';

export const App = () => {
  return (
    <SafeAreaView>
      <TaskList />
    </SafeAreaView>
  );
};

export default App;
