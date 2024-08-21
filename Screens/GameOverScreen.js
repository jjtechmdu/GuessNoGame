import {
  Image,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView
} from "react-native";
import Title from "../Components/ui/Title";
import Colors from "../constants/Colors";
import PrimaryButton from "../Components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 200;
  }

  if (height < 400) {
    imageSize = 100;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView>
    <View style={styles.rootContainer}>
      <Title>Game is Over!</Title>
      <View style={[styles.imageContainer, imageStyle]}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone need <Text style={styles.heighlight}>{roundsNumber}</Text>{" "}
        rounds to guess number{" "}
        <Text style={styles.heighlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
    </ScrollView>
  );
}
export default GameOverScreen;

// const deviceWidth= Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: deviceWidth<380 ? 200 : 300,
    // height: deviceWidth<380 ? 200 : 300,
    // borderRadius: deviceWidth<380 ? 100 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  heighlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
