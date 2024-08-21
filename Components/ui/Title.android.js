import { Text, StyleSheet, Dimensions, Platform } from "react-native"
import Colors from "../../constants/Colors"

function Title({children}){
return <Text style={styles.title}>{children}</Text>
}
export default Title

const deviceWidth = Dimensions.get('window').width;

const styles= StyleSheet.create({
    title: {
        fontSize: deviceWidth<380 ? 18 : 24,
        //fontWeight: "bold",
        fontFamily:'open-sans-bold',
        color: 'white',
        textAlign: "center",
        //borderWidth: Platform.OS==='ios' ? 2 : 0,
        //borderWidth:Platform.select({ios: 0, android: 2}),
        borderWidth:2,
        borderColor:'white',
        padding:12,
        maxWidth:'80%',
        width:300,
      },
})