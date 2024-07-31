import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getScreenColor } from '../functions';

type DashedBorderProps = {
  screen: string 
}


const DashedBorder: React.FC<DashedBorderProps> = ({ screen }: DashedBorderProps) => {
  let borderColor = getScreenColor(screen, '0.5')
  return(<View style={[styles.dashedBorder, {borderColor}]} />)
}

const styles = StyleSheet.create({
  dashedBorder: {
    borderStyle: 'dashed',
    borderWidth: 0.7,
    width: '100%',
  },
});

export default DashedBorder;