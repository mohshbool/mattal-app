import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Linking,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../Theme/Theme';
import {AreaReducer} from '../Action/types';
import {RootState} from '../Reducer';
import Text from '../Components/Text';
import Fonts from '../Theme/Fonts';
import Button from '../Components/Button';
import {useDarkMode} from 'react-native-dynamic';

const {width} = Dimensions.get('screen');

const MoreComing: React.FC = () => {
  const dark = useDarkMode();
  const {top} = useSafeAreaInsets();
  const {selectedArea} = useSelector<RootState>(
    (state) => state.Area,
  ) as AreaReducer;

  return (
    <View key={2123}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: dark ? Colors.primary : Colors.background,
            paddingTop: top + Platform.OS === 'ios' ? 5 : 10,
          },
        ]}>
        <Image
          source={
            dark
              ? require('../Assets/Images/more-top.dark.jpg')
              : require('../Assets/Images/more-top.jpg')
          }
          style={styles.logoTop}
        />
        <Text
          text={`Stay tuned for more Mattals in ${selectedArea} `}
          style={styles.bigText}
          containerStyle={{...styles.noFlex, ...styles.bigTextContainer}}
        />
        <Image
          source={
            dark
              ? require('../Assets/Images/more-bottom.dark.jpg')
              : require('../Assets/Images/more-bottom.jpg')
          }
          style={styles.logoBottom}
        />
      </View>
      <View style={styles.footer}>
        <Text
          text="Have a Mattal that you'd like to share?"
          containerStyle={{...styles.noFlex, ...styles.footerTextContainer}}
          style={styles.footerText}
        />
        <Button
          text="Contact us on our Instagram"
          containerStyle={{...styles.noFlex, ...styles.footerButton}}
          textStyle={styles.footerButtonText}
          onPress={() =>
            Linking.openURL('https://www.instagram.com/mattal.app')
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noFlex: {flex: 0},
  container: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoTop: {
    width,
    maxHeight: '58%',
    resizeMode: 'stretch',
  },
  bigTextContainer: {
    paddingVertical: 15,
  },
  bigText: {
    fontSize: Fonts.xl,
  },
  logoBottom: {
    width,
    maxHeight: '18%',
    resizeMode: 'stretch',
  },
  footer: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  footerTextContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: Fonts.sm,
    paddingBottom: 6,
  },
  footerButton: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  footerButtonText: {
    fontSize: Fonts.md / 1.1,
  },
});

export default MoreComing;
