import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuchanScreen from './src/screens/AuchanScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import GFScreen from './src/screens/GFScreen';
import OthersScreen from './src/screens/OthersScreen';
import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ConditionalBottomNavigation from './src/components/ConditionalBottomNavigation';

SplashScreen.preventAutoHideAsync();


const Stack = createStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const BackgroundWrapper = ({ children, gradientColors }: { children: React.ReactNode, gradientColors: string[] }) => (
  <LinearGradient
    colors={gradientColors}
    style={{ flex: 1 }}
  >
    {children}
  </LinearGradient>
);



export default function App() {
  const [appState, setAppState] = useState({
    activeButton: 'Home',
    gradientColors: ['#FFFFFF', '#FFB6C1'],
    bottomNavBgColor: 'rgba(92,41,41,0.49)',
  });

  const [fontsLoaded] = Font.useFonts({
    'inter-regular': require('./assets/fonts/Inter_28pt-Regular.ttf'),
    'inter-bold': require('./assets/fonts/Inter_28pt-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={navTheme}>
        <BackgroundWrapper gradientColors={appState.gradientColors}>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false,  cardStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="Home">
            {props => <HomeScreen {...props} setAppState={setAppState} />}
            </Stack.Screen>              
            <Stack.Screen name="GF">
              {props => <GFScreen {...props} setAppState={setAppState} />}
            </Stack.Screen>
            <Stack.Screen name="Auchan">
              {props => <AuchanScreen {...props} setAppState={setAppState} />}
            </Stack.Screen>
            <Stack.Screen name="Others">
              {props => <OthersScreen {...props} setAppState={setAppState} />}
            </Stack.Screen>
            <Stack.Screen name="Recipe">
              {props => <RecipeScreen {...props} setAppState={setAppState} />}
            </Stack.Screen>
          </Stack.Navigator>
          <ConditionalBottomNavigation appState={appState} setAppState={setAppState} />
        </BackgroundWrapper>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});