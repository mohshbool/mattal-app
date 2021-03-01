import ViewPager from '@react-native-community/viewpager';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AreaReducer} from '../Action/types';
import {RootState} from '../Reducer';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import {Mattal} from '../types';
import MattalHero from './MattalHero';
import Select from './Select';

const data: Mattal[] = [
  {
    area: 'Dabouq',
    images: [
      'https://cf.bstatic.com/images/hotel/max1024x768/241/241074118.jpg',
    ],
    name: 'Al Mattal',
    review: 4,
    maps_url: 'https://goo.gl/maps/UvE2K78aksfGqhiQ6',
    facilities: {
      supermarket: true,
      food: false,
    },
  },
];

const Home: React.FC = () => {
  const {navigate} = useNavigation();
  const {selectedArea} = useSelector<RootState>(
    (state) => state.Area,
  ) as AreaReducer;
  return (
    <ViewPager style={styles.container} initialPage={0} orientation="vertical">
      <Select />
      {data.map((mattal, i) => (
        <MattalHero key={i} mattal={mattal} />
      ))}
    </ViewPager>
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
