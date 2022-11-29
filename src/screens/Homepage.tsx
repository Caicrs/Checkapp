import React from "react";
import { StyleSheet,View,Text } from "react-native";

const Homepage = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Homepage</Text>
        </View>
    )
}

export default Homepage;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:32
    }
})