import ViewPager from '@react-native-community/viewpager';
import React from 'react';
import {StyleSheet} from 'react-native';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import {Mattal} from '../types';
import MattalHero from './MattalHero';
import Select from './Select';

const data: Mattal[] = [
  {
    area: 'Dabouq',
    images: ['https://cdn.wallpapersafari.com/69/58/qcUm7T.jpg'],
    name: 'Al Mattal',
    review: 4,
    maps_url: 'https://goo.gl/maps/UvE2K78aksfGqhiQ6',
    facilities: {
      supermarket: true,
      food: false,
    },
  },
  {
    area: 'Dabouq',
    images: [
      // 'https://lh5.googleusercontent.com/p/AF1QipO-Z0IxnD0Xx6waGhGnx5u6Ag4LdprtBWAS0B59=s901-k-no',
      'https://www.alessandromichelazzi.com/wp-content/uploads/2020/11/iPhone-12-Pro-Max-Portrait-Mode-Bokeh-Lens-65mm-Alessandro-Michelazzi-05.jpg',
    ],
    name: 'Mattal Talia',
    review: 2,
    maps_url: 'https://goo.gl/maps/UvE2K78aksfGqhiQ6',
    facilities: {
      supermarket: true,
      food: true,
    },
  },
];

const Home: React.FC = () => {
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
