import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../Components/Button';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.whereYouAre}>You are now in Khalda</Text>
      <Button text="Find me a Mattal" onPress={() => console.log('yes')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  whereYouAre: {
    color: Colors.primary,
    fontSize: Fonts.xl,
    marginBottom: 230,
  },
});

export default Home;
