import { Text, View, StyleSheet, rgba } from "react-native"

export default function Task({text}){
    return(
        <View style={styles.wrapper}>
        <View style={styles.square}></View>
        <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 17,
        fontFamily: "SF Pro Display",
        paddingLeft: 10,
      },
      square:{
        width: 26,
aspectRatio: 1,
borderRadius: 4,
backgroundColor: 'rgba(141, 223, 218, 0.40)',
margin: 5,
      },
      wrapper:{
        height: 50,
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        padding: 10,
shadowColor:'#d3d3d3',
shadowOffset: {width: 2, height: 2},
shadowOpacity: 0.5,
shadowRadius: 14,
      }
})