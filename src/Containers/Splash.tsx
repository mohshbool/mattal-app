import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {Animated, Platform, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import {updateConfigs} from '../Action';
import {ConfigsReducer} from '../Action/types';
import {apiRequest} from '../API';
import {RootStackParamList} from '../App';
import {RootState} from '../Reducer';
import {CreateDeviceResponse} from '../API/types';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface SplashProps {
  navigation: SplashScreenNavigationProp;
}

const Splash: React.FC<SplashProps> = ({navigation: {replace}}) => {
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
            .then((firebase_token) => {
              apiRequest<CreateDeviceResponse>({
                url: '/device/create',
                method: 'POST',
                data: {fcm_token: firebase_token, os: Platform.OS},
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

    const timeout = setTimeout(() => fcm_token && replace('Home'), 3000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fcm_token]);

  return (
    <Animated.View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        opacity: LogoFadeIn,
      }}>
      <Text style={{fontSize: 50}}>Mattal - مطّل</Text>
    </Animated.View>
  );
};

export default Splash;
