import ViewPager from '@react-native-community/viewpager';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AreaReducer} from '../Action/types';
import {apiRequest} from '../API';
import {RootState} from '../Reducer';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import {Mattal} from '../types';
import MattalHero from './MattalHero';
import Select from './Select';

const Home: React.FC = () => {
  const {selectedArea} = useSelector<RootState>(
    (state) => state.Area,
  ) as AreaReducer;

  const [mattals, setMattals] = React.useState<Mattal[]>([]);
  const viewPager = React.useRef<ViewPager>(null);

  React.useEffect(() => {
    if (selectedArea.length > 1) {
      apiRequest<Mattal[]>({
        url: '/mattal/by-area',
        params: {area: selectedArea},
      })
        .then((req) => {
          setMattals(req);
          setTimeout(() => viewPager.current?.setPage(1), 500);
        })
        .catch((e) => console.error(e.message));
    }
  }, [selectedArea]);

  return (
    <ViewPager
      ref={viewPager}
      style={styles.container}
      initialPage={0}
      orientation="vertical">
      <Select />
      {mattals.map((mattal, i) => (
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
