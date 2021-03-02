import React from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import Button from '../Components/Button';
import Text from '../Components/Text';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import {Mattal} from '../types';

interface MattalHeroProps {
  mattal: Mattal;
}

const MattalHero: React.FC<MattalHeroProps> = ({mattal}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `http://192.168.1.123:5000/public/${mattal.images[0].filename}`,
        }}
        resizeMode="cover"
      />
      <Text
        text={mattal.name}
        style={styles.area}
        containerStyle={styles.areaContainer}
      />
      <Text
        text={mattal.area}
        style={styles.name}
        containerStyle={styles.nameContainer}
      />
      {mattal.facilities.supermarket && (
        <Text
          text={'🍫'}
          style={styles.supermarket}
          containerStyle={styles.supermarketContainer}
        />
      )}
      {mattal.facilities.food && (
        <Text
          text={'🍔'}
          style={styles.food}
          containerStyle={{
            ...styles.foodContainer,
            right: mattal.facilities.supermarket ? 50 : 12,
          }}
        />
      )}
      <Button
        text="Take me to the Mattal"
        onPress={() => console.log('s')}
        outlined
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.lg,
    fontWeight: '500',
    paddingHorizontal: 8,
    color: Colors.secondary,
  },
  areaContainer: {
    position: 'absolute',
    left: 12,
    bottom: 120,
  },
  area: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Fonts.xl,
  },
  nameContainer: {
    position: 'absolute',
    left: 12,
    bottom: 90,
  },
  name: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: Fonts.lg,
  },
  supermarketContainer: {
    position: 'absolute',
    right: 12,
    bottom: 40,
  },
  supermarket: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: Fonts.xl,
  },
  foodContainer: {
    position: 'absolute',
    right: 50,
    bottom: 40,
  },
  food: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: Fonts.xl,
  },
  buttonContainer: {
    position: 'absolute',
    left: 10,
    bottom: 35,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: Fonts.md,
  },
});

export default MattalHero;
