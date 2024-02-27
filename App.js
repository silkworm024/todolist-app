import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Task from "./components/Task.js";
import AddTask from "./components/addTask.js";

export default function App() {
  const [taskList, setTaskList] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Today's Tasks</Text>
      </View>
      <View style={styles.taskWrapper}>
        <ScrollView>
        {taskList.map((task, index) => (
          <Task text={task} key={index} />
        ))}
</ScrollView>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.inputWrapper}>
          <AddTask taskList={setTaskList} setTaskList={setTaskList}/>
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
});
