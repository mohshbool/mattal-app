import React from 'react';
import {useSelector} from 'react-redux';
import {useDarkMode} from 'react-native-dynamic';
import {BackHandler, Platform, StatusBar, StyleSheet} from 'react-native';
import {Notification} from 'react-native-in-app-message';
import ViewPager from '@react-native-community/viewpager';

import {apiRequest} from '../API';
import {RootState} from '../Reducer';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import {Mattal} from '../types';
import MattalHero from './MattalHero';
import Select from './Select';
import MoreComing from './MoreComing';
import {AreaReducer, ConfigsReducer} from '../Action/types';
import {uniqBy} from 'lodash';

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
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [emoji, setEmoji] = React.useState<'Supermarket' | 'Restaurant'>();
  const [mattals, setMattals] = React.useState<Mattal[] | undefined>([]);
  const [todaysMattal, setTodaysMattal] = React.useState<Mattal>();

  const backToTop = () => viewPager.current?.setPage(0);
  const goToMattals = () => viewPager.current?.setPage(1);
  const goOneUp = () => viewPager.current?.setPage(currentPage - 1);

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
          const {length} = req;
          for (let i = 0; i < length; i++) {
            if (req[i]._id === todaysMattal?._id) {
              req.unshift(req[i]);
            }
          }
          setMattals(uniqBy(req, '_id'));
          setTimeout(goToMattals, 150);
        })
        .catch((e) => console.error(e.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArea]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (currentPage === 0) {
      BackHandler.exitApp();
      return true;
    }
  });

  return (
    <>
      <Notification
        duration={1500}
        ref={notificationRef}
        textColor={dark ? Colors.white : Colors.primary}
        blurType={dark ? 'dark' : 'xlight'}
        text={`${emoji === 'Supermarket' ? '🍫' : '🍔'} ${emoji} Nearby`}
        style={{
          backgroundColor: dark ? Colors.primary : Colors.white,
          marginTop: (StatusBar.currentHeight || 0) + 10,
        }}
      />
      {Platform.OS === 'android' && <StatusBar hidden />}
      <ViewPager
        ref={viewPager}
        style={[
          styles.container,
          {backgroundColor: dark ? Colors.primary : Colors.background},
        ]}
        initialPage={0}
        onPageScroll={(e) => setCurrentPage(e.nativeEvent.position)}
        orientation="vertical">
        <Select
          goToMattals={goToMattals}
          todaysMattal={todaysMattal}
          setMattals={setMattals}
        />
        {mattals?.map((mattal, i) => {
          if (i === mattals.length - 1 && Platform.OS !== 'android') {
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
              goOneUp={goOneUp}
              currentPage={currentPage}
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
