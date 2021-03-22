import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ViewPager from '@react-native-community/viewpager';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AreaReducer, ConfigsReducer} from '../Action/types';
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
  const {fcm_token} = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer;

  const viewPager = React.useRef<ViewPager>(null);
  const [mattals, setMattals] = React.useState<Mattal[] | undefined>([]);
  const [todaysMattal, setTodaysMattal] = React.useState<Mattal>();

  React.useEffect(() => {
    apiRequest<Mattal>({
      url: '/mattal/todays',
      headers: {
        Authorization: `Bearer ${fcm_token}`,
      },
    })
      .then((req) => {
        setTodaysMattal(req);
      })
      .catch((e) => {
        console.error(e.message);
        if (e.message === 'Request failed with status code 403') {
          AsyncStorage.clear();
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (selectedArea.length > 1) {
      apiRequest<Mattal[]>({
        url: '/mattal/by-area',
        params: {area: selectedArea},
        headers: {
          Authorization: `Bearer ${fcm_token}`,
        },
      })
        .then((req) => {
          setMattals(req);
          setTimeout(() => viewPager.current?.setPage(1), 500);
        })
        .catch((e) => console.error(e.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArea]);

  return (
    <ViewPager
      ref={viewPager}
      style={styles.container}
      initialPage={0}
      orientation="vertical">
      <Select todaysMattal={todaysMattal} setMattals={setMattals} />
      {mattals?.map((mattal, i) => (
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
