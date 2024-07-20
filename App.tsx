import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuchanScreen from './src/screens/AuchanScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import GFScreen from './src/screens/GFScreen';
import BottomNavigation from './src/components/BottomNavigation';
import OthersScreen from './src/screens/OthersScreen';
import HomeScreen from './src/screens/HomeScreen'
import { LinearGradient } from "expo-linear-gradient";
import { useState } from 'react';

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
    gradientColors: ['#FFFFFF', '#FFB6C1'], // Default colors
    bottomNavBgColor: '#FFFFFF', // Default background color for BottomNavigation
    activeButton: 'Home', // Default active button
  });

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
            </Stack.Navigator>
            <BottomNavigation appState={appState} setAppState={setAppState}  />
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