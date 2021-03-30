import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {useDispatch, useSelector} from 'react-redux';

import {updateSelectedArea} from '../Action';
import {AreaReducer} from '../Action/types';
import {RootState} from '../Reducer';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import Text from './Text';

interface AreaCardProps {
  label: string;
  goToMattals: any;
}

const AreaCard: React.FC<AreaCardProps> = ({label, goToMattals}) => {
  const dark = useDarkMode();
  const dispatch = useDispatch();
  const {selectedArea} = useSelector<RootState>(
    (state) => state.Area,
  ) as AreaReducer;

  return (
    <View
      style={[
        styles.border,
        {borderColor: dark ? Colors.secondary : Colors.primary},
      ]}>
      <TouchableOpacity
        onPress={() => {
          if (label === selectedArea) {
            goToMattals();
          } else {
            dispatch(updateSelectedArea(label));
          }
        }}>
        <Text
          text={label}
          containerStyle={styles.container}
          style={styles.text}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    width: '47%',
    borderRadius: 5,
    borderColor: Colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 8,
  },
  container: {
    flex: 0,
    paddingVertical: 25,
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },
});

export default AreaCard;
