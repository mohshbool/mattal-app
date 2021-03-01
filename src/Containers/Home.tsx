import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AreaReducer} from '../Action/types';
import Button from '../Components/Button';
import {RootState} from '../Reducer';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

const Home: React.FC = () => {
  const {navigate} = useNavigation();
  const {selectedArea} = useSelector<RootState>(
    (state) => state.Area,
  ) as AreaReducer;
  return (
    <View style={styles.container}>
      <Button text="Pick area" onPress={() => navigate('Select')} />
      {selectedArea.length > 1 ? (
        <Text style={styles.whereYouAre}>You want to go to {selectedArea}</Text>
      ) : (
        <Text style={styles.whereYouAre}>
          Please choose where you want to go
        </Text>
      )}
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
