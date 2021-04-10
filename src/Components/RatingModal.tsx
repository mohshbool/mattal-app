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
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  ratingSubmit: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isVisible,
  setModalVisible,
  ratingSubmit,
  rating,
  setRating,
}) => {
  const dark = useDarkMode();
  const [disabled, setDisabled] = React.useState<boolean>(true);
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
            {
              backgroundColor: dark ? Colors.primary : Colors.white,
              height: Dimensions.get('screen').height * (disabled ? 0.2 : 0.27),
            },
          ]}>
          <AirbnbRating
            count={5}
            size={50}
            showRating
            // @ts-ignore
            reviewSize={30}
            defaultRating={rating}
            onFinishRating={(_rating) => {
              setRating(_rating);
              setDisabled(false);
            }}
            selectedColor={dark ? Colors.secondary : Colors.primary}
            unSelectedColor={dark ? Colors.white : Colors.background}
            reviewColor={dark ? Colors.secondary : Colors.primary}
          />
          <Button
            text="Rate"
            disabled={disabled}
            onPress={ratingSubmit}
            containerStyle={{
              ...styles.rateContainer,
              backgroundColor: dark
                ? disabled
                  ? Colors.primary
                  : Colors.secondary
                : disabled
                ? Colors.white
                : Colors.primary,
            }}
            textStyle={{
              ...styles.rateText,
              color: dark ? Colors.primary : Colors.white,
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
