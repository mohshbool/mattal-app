import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';

import {Colors} from '../Theme/Theme';
import {AreaReducer} from '../Action/types';
import {RootState} from '../Reducer';
import Text from '../Components/Text';
import Fonts from '../Theme/Fonts';
import Button from '../Components/Button';

const {width} = Dimensions.get('screen');

const MoreComing: React.FC = () => {
  const {selectedArea} = useSelector<RootState>(
    (state) => state.Area,
  ) as AreaReducer;

  return (
    <SafeAreaView key={2123} style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../Assets/Images/more-top.jpeg')}
          style={styles.logoTop}
        />
        <Text
          text={`Stay tuned for more Mattals in ${selectedArea} `}
          style={styles.bigText}
          containerStyle={{...styles.noFlex, ...styles.bigTextContainer}}
        />
        <Image
          source={require('../Assets/Images/more-bottom.jpeg')}
          style={styles.logoBottom}
        />
      </View>
      <View style={styles.footer}>
        <Text
          text="Have a Mattal that you'd like to be on our app?"
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noFlex: {flex: 0},
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  logoTop: {
    width,
    marginTop: (StatusBar.currentHeight || 0) + 2,
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
    justifyContent: 'flex-end',
  },
  footerTextContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: Fonts.sm,
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
