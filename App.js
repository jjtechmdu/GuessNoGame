import { useState, useEffect, useCallback } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./Screens/StartGameScreen";
import GameScreen from "./Screens/GameScreen";
import Colors from "./constants/Colors";
import GameOverScreen from "./Screens/GameOverScreen";
import * as Font from "expo-font";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  // const [fontloaded] = useFonts({
  //   'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
  //   'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  // })

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // if(!fontloaded){
  //   return <AppLoading/>
  // }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
  }

  function gameIsOverHandler(NoofRounds) {
    setIsGameOver(true);
    setGuessRounds(NoofRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameIsOverHandler} />;
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
    <StatusBar style="light"/>
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
      onLayout={onLayoutRootView}
      
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
