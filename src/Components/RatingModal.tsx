import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Modal from 'react-native-modal';
import {AirbnbRating} from 'react-native-ratings';
import Fonts from '../Theme/Fonts';

import {Colors} from '../Theme/Theme';
import Button from './Button';

interface RatingModalProps {
  isVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isVisible,
  setModalVisible,
}) => {
  const dark = !useDarkMode();
  const closeModal = () => setModalVisible(false);
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection="up">
      <View style={styles.outerContainer}>
        <View
          style={[
            styles.innerContainer,
            {backgroundColor: dark ? Colors.primary : Colors.white},
          ]}>
          <AirbnbRating
            count={5}
            size={50}
            showRating
            // @ts-ignore
            reviewSize={30}
            // reviews={[]}
            defaultRating={0}
            onFinishRating={() => setTimeout(closeModal, 1000)}
            selectedColor={dark ? Colors.secondary : Colors.primary}
            unSelectedColor={dark ? Colors.white : Colors.background}
            reviewColor={dark ? Colors.secondary : Colors.primary}
          />
          <Button
            text="Rate"
            onPress={closeModal}
            containerStyle={{
              ...styles.rateContainer,
              backgroundColor: dark ? Colors.secondary : Colors.primary,
            }}
            textStyle={{
              ...styles.rateText,
              color: dark ? Colors.primary : Colors.secondary,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flex3: {
    flex: 3,
  },
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  innerContainer: {
    padding: 20,
    borderRadius: 15,
    width: '100%',
    justifyContent: 'space-between',
    height: Dimensions.get('screen').height * 0.27,
  },
  rateContainer: {
    height: 45,
    margin: 0,
    paddingVertical: 0,
    width: '45%',
    alignSelf: 'center',
  },
  rateText: {
    fontSize: Fonts.lg,
  },
});

export default RatingModal;
