import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../Components/ui/Title";
import NumberContainer from "../Components/game/NumberContainer";
import PrimaryButton from "../Components/ui/PrimaryButton";
import Card from "../Components/ui/Card";
import InstructionText from "../Components/ui/InstructionText";
import GuesslogItem from "../Components/game/GuesslogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minNum = 1;
let maxNum = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, SetCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minNum = 1;
    maxNum = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Dont lie", "You know that this is wrong ...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxNum = currentGuess;
    } else {
      minNum = currentGuess + 1;
    }
    const nextGuess = generateRandomBetween(minNum, maxNum, currentGuess);
    SetCurrentGuess(nextGuess);
    setGuessRounds((prevGuessRounds) => [nextGuess, ...prevGuessRounds]);
  }

  const guessRoundListLength = guessRounds.length;

  let content = (<>
  <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
  </>);

  if(width>500){
    content=(<>
        <View style={styles.buttonsContainerWide}>
        <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
    </>)
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/*  {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuesslogItem
              roundsNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 34,
    alignItems:'center',
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainerWide:{
    flexDirection:'row',
    alignItems:'center',
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer:{
    flex:1,
    padding:12,
  }
});
