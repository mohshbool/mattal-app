import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Notification} from 'react-native-in-app-message';
import ViewPager from '@react-native-community/viewpager';

import {AreaReducer, ConfigsReducer} from '../Action/types';
import {apiRequest} from '../API';
import {RootState} from '../Reducer';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import {Mattal} from '../types';
import MattalHero from './MattalHero';
import Select from './Select';
import MoreComing from './MoreComing';
import {useDarkMode} from 'react-native-dynamic';

const Home: React.FC = () => {
  const {selectedArea} = useSelector<RootState>(
    (state) => state.Area,
  ) as AreaReducer;
  const {fcm_token} = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer;

  const dark = useDarkMode();
  const viewPager = React.useRef<ViewPager>(null);
  const notificationRef = React.useRef(null);
  const [emoji, setEmoji] = React.useState<'Supermarket' | 'Restaurant'>();
  const [mattals, setMattals] = React.useState<Mattal[] | undefined>([]);
  const [todaysMattal, setTodaysMattal] = React.useState<Mattal>();

  const backToTop = () => viewPager.current?.setPage(0);
  const goToMattals = () => viewPager.current?.setPage(1);

  React.useEffect(() => {
    apiRequest<Mattal>({
      url: '/mattal/todays',
    })
      .then((req) => {
        setTodaysMattal(req);
      })
      .catch((e) => {
        console.error(e.message);
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
          console.log(req);
          setMattals(req);
          setTimeout(goToMattals, 150);
        })
        .catch((e) => console.error(e.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArea]);

  return (
    <>
      <Notification
        duration={1500}
        ref={notificationRef}
        textColor={dark ? Colors.white : Colors.primary}
        blurType={dark ? 'dark' : 'xlight'}
        text={`${emoji === 'Supermarket' ? '🍫' : '🍔'} ${emoji} Nearby`}
      />
      <ViewPager
        ref={viewPager}
        style={[
          styles.container,
          {backgroundColor: dark ? Colors.primary : Colors.background},
        ]}
        initialPage={0}
        orientation="vertical">
        <Select
          goToMattals={goToMattals}
          todaysMattal={todaysMattal}
          setMattals={setMattals}
        />
        {mattals?.map((mattal, i) => {
          if (i === mattals.length - 1) {
            return (
              <>
                <MattalHero
                  mattal={mattal}
                  setEmoji={setEmoji}
                  backToTop={backToTop}
                  notificationRef={notificationRef}
                />
                <MoreComing />
              </>
            );
          }
          return (
            <MattalHero
              mattal={mattal}
              setEmoji={setEmoji}
              backToTop={backToTop}
              notificationRef={notificationRef}
            />
          );
        })}
      </ViewPager>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whereYouAre: {
    color: Colors.primary,
    fontSize: Fonts.xl,
    marginBottom: 230,
  },
});

export default Home;
