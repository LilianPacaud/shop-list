import React from 'react';
import { useNavigationState } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import { State } from '../types';

interface ConditionalBottomNavigationProps {
  appState: State;
  setAppState: React.Dispatch<React.SetStateAction<State>>;
}

const ConditionalBottomNavigation: React.FC<ConditionalBottomNavigationProps> = ({ appState, setAppState }) => {
  const routeName = useNavigationState((state) => state?.routes[state.index].name);

  if (routeName === 'Recipe') {
    return null;
  }

  return <BottomNavigation appState={appState} setAppState={setAppState} />;
};

export default ConditionalBottomNavigation;
