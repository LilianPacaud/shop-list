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
  const [gradientColors, setGradientColors] = useState<string[]>(['#FFFFFF', '#FFB6C1']); // Default colors
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={navTheme}>
        <BackgroundWrapper gradientColors={gradientColors}>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false,  cardStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen name="Home">
            {props => <HomeScreen {...props} setGradientColors={setGradientColors} />}
            </Stack.Screen>              
            <Stack.Screen name="GF">
              {props => <GFScreen {...props} setGradientColors={setGradientColors} />}
            </Stack.Screen>
            <Stack.Screen name="Auchan">
              {props => <AuchanScreen {...props} setGradientColors={setGradientColors} />}
            </Stack.Screen>
            <Stack.Screen name="Others">
              {props => <OthersScreen {...props} setGradientColors={setGradientColors} />}
            </Stack.Screen>
            </Stack.Navigator>
            <BottomNavigation />
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