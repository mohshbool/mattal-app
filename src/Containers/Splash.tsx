import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {Animated, Image, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import {updateConfigs} from '../Action';
import {ConfigsReducer} from '../Action/types';
import {apiRequest} from '../API';
import {RootStackParamList} from '../App';
import {RootState} from '../Reducer';
import {CreateDeviceResponse} from '../API/types';
import {useDarkMode} from 'react-native-dynamic';
import {getDeviceName} from 'react-native-device-info';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface SplashProps {
  navigation: SplashScreenNavigationProp;
}

const Splash: React.FC<SplashProps> = ({navigation: {replace}}) => {
  const dark = useDarkMode();
  const dispatch = useDispatch();
  const {fcm_token} = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer;

  const LogoFadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getNotificationPermissions = async () => {
      await messaging()
        .requestPermission()
        .then(() => {
          messaging()
            .getToken()
            .then(async (firebase_token) => {
              apiRequest<CreateDeviceResponse>({
                url: '/device/create',
                method: 'POST',
                data: {
                  fcm_token: firebase_token,
                  os: Platform.OS,
                  name: await getDeviceName(),
                },
              })
                .then((req) => {
                  dispatch(updateConfigs({fcm_token: req.fcm_token}));
                })
                .catch((e) => console.error(e.message));
            })
            .catch((err) => {
              // tslint:disable-next-line: no-console
              console.log(err);
            });
        })
        .catch((error) => {
          // tslint:disable-next-line: no-console
          console.log(error);
        });
    };
    if (!fcm_token) {
      getNotificationPermissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Animated.timing(LogoFadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => replace('Home'), 2000);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        opacity: LogoFadeIn,
      }}>
      <Image
        source={
          dark
            ? require('../Assets/Images/splash.dark.jpg')
            : require('../Assets/Images/splash.jpg')
        }
        style={{width: '100%', height: '100%'}}
      />
    </Animated.View>
  );
};

export default Splash;
