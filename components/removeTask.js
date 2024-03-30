import { Pressable, StyleSheet, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RemoveTask({taskList, setTaskList, index}){
      const eventHandler = async () => 
      {
            const newTask = taskList.slice(0, index).concat(taskList.slice(index + 1))
            setTaskList(newTask);
       try{
            await AsyncStorage.setItem('taskList', JSON.stringify(newTask));
       }
       catch(error){
            console.log(error);
       }
      }

      return(
    <Pressable onPress={eventHandler}>
      <View style={styles.line} ></View>
    </Pressable>
      )
}

const styles = StyleSheet.create({
      line:{
            width: 20,
    aspectRatio: 5,
    borderRadius: 4,
    marginTop: 43,
    marginLeft: 25,
    backgroundColor: '#888',
    justifyContent: 'right',
          },
})