import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function GuesslogItem({ roundsNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundsNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess {guess}</Text>
    </View>
  );
}
export default GuesslogItem;

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor:Colors.accent500,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemText:{
    fontFamily:'open-sans',
    
  }
});
