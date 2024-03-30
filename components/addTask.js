import { Pressable, TextInput, View, Text, StyleSheet, Keyboard} from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTask({taskList, setTaskList}){
    const [task, setTask] = useState(null);

    const storeTask = async(newTask) =>{
        try{
            await AsyncStorage.setItem('taskList', JSON.stringify(newTask));
        }
        catch(error){
    console.log(error);
        }
    }

    const eventHandler = () => {
        if(task != null){
            let newTask = [];
            if(taskList.length != 0){    // to add new task before complete task
            let index = 0;
            while(index < taskList.length && !taskList[index].complete){
                index++;
            }
            newTask = [...taskList.slice(0, index), {text: String(task), complete: false}];
            newTask = newTask.concat(taskList.slice(index))
        }
        else{
newTask = [...taskList, {text: String(task), complete: false}]
        }
        setTaskList(newTask);
        storeTask(newTask);
        setTask(null);
        Keyboard.dismiss();
        }
    };

return(
    <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
        <TextInput placeholder="Add a new task" onChangeText={(text) => setTask(text)} value={task}></TextInput>
        </View>
        <Pressable onPress={eventHandler} style={styles.button}>
            <Text style={styles.text}>Add</Text>
        </Pressable>
    </View>
)
}

const styles = StyleSheet.create({
    wrapper:{
flexDirection: 'row',
    },
    inputWrapper:{
        height: 40,
        width: 330,
        borderRadius: 8,
backgroundColor: '#ffffff',
padding: 10,
    },
    button:{
        padding: 10,
        paddingLeft: 20,
    },
    text:{
        fontWeight: 'bold',
        color: '#558cf6',
    },
})