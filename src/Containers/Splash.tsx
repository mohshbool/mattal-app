import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {Animated, Platform, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {updateConfigs} from '../Action';
import {ConfigsRedcuer} from '../Action/types';
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
  ) as ConfigsRedcuer;

  const LogoFadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!fcm_token) {
      apiRequest<CreateDeviceResponse>({
        url: '/device/create',
        method: 'POST',
        data: {fcm_token: 'dsadsas', os: Platform.OS},
      })
        .then((req) => {
          dispatch(updateConfigs({fcm_token: req.fcm_token}));
        })
        .catch((e) => console.error(e.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Animated.timing(LogoFadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => replace('Home'), 1000);

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
      <Text style={{fontSize: 50}}>Mattal - مطّل</Text>
    </Animated.View>
  );
};

export default Splash;
