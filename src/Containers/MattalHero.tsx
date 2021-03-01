import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import {Mattal} from '../types';

interface MattalHeroProps {
  mattal: Mattal;
}

const MattalHero: React.FC<MattalHeroProps> = ({mattal}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: mattal.images[0]}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    paddingVertical: 15,
    paddingHorizontal: 38,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.lg,
    fontWeight: '500',
    paddingHorizontal: 8,
    color: Colors.secondary,
  },
});

export default MattalHero;
