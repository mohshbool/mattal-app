import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {Animated, Text} from 'react-native';
import {RootStackParamList} from '../App';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface SplashProps {
  navigation: SplashScreenNavigationProp;
}

const Splash: React.FC<SplashProps> = ({navigation: {replace}}) => {
  const LogoFadeIn = useRef(new Animated.Value(0)).current;

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
