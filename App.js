import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from "./components/Task.js";
import AddTask from "./components/addTask.js";
import RemoveTask from "./components/removeTask.js";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const[isLoaded, setIsLoaded] = useState(false);

  const handlePressEvent = async (index) =>{
    let newTask = [...taskList];
    newTask[index].complete = !newTask[index].complete;
    const task = newTask[index];
    newTask = newTask.slice(0, index).concat(newTask.slice(index + 1));
    task.complete ?  newTask = [...newTask, task] : newTask = [task, ...newTask]; 
    setTaskList(newTask);
    try{
      await AsyncStorage.setItem('taskList', JSON.stringify(newTask));
  }
  catch(error){
console.log(error);
}
  }

  const loadTask = async() => {
    try{
const data = await AsyncStorage.getItem('taskList');
if(data != null){
  setTaskList(JSON.parse(data));
}
setIsLoaded(true);
}
  catch(error){
    console.log(error);
  }
}

//with empty array, it will only load once
useEffect(() => {loadTask()}, []);

//key is not accessible
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Today's Tasks</Text>
      </View>
      <View style={styles.taskWrapper}>
        {isLoaded ? 
        <ScrollView>
        {taskList.map((task, index) => (
          <View key={index} style={styles.individualWrapper}>
          <Task text={task.text} complete={task.complete} onPress={() => handlePressEvent(index)}/>
          <RemoveTask index={index} taskList={taskList} setTaskList={setTaskList} />
          </View>
        ))}
</ScrollView>
:
<ActivityIndicator></ActivityIndicator>}
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.inputWrapper}>
          <AddTask taskList={taskList} setTaskList={setTaskList}/>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

//it's important to set the position of your KeyboardAvoidingView as absolute
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f1f1",
  },
  header: {
    alignItems: "left",
    marginTop: 70,
    marginLeft: 15,
  },
  taskWrapper: {
    height: '70%',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  inputWrapper: {
    marginLeft: 15,
    marginRight: 15,
    position: 'absolute',
    bottom: 30,

  },
  text: {
    fontWeight: "bold",
    fontSize: 34,
  },
  individualWrapper: {
flexDirection:'row',
  }
});
