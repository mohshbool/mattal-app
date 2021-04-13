import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View, Dimensions, Platform} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Modal from 'react-native-modal';

import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import Text from './Text';

interface HelpModalProps {
  isVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const HelpModal: React.FC<HelpModalProps> = ({isVisible, setModalVisible}) => {
  const dark = useDarkMode();
  const closeModal = () => setModalVisible(false);
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      coverScreen={Platform.OS !== 'android'}
      deviceHeight={Dimensions.get('screen').height}
      swipeDirection="up">
      <View style={styles.outerContainer}>
        <View
          style={[
            styles.innerContainer,
            {backgroundColor: dark ? Colors.primary : Colors.white},
          ]}>
          <Text
            text="This page includes some critical information about the Mattal. You can swipe and down to see more Mattals in this area"
            style={styles.headText}
            containerStyle={styles.flex3}
          />
          <View style={{...styles.flex3, paddingVertical: 20}}>
            <Text text="🍔: Restaurant nearby" style={styles.personName} />
            <Text text="🍫: Supermarket nearby" style={styles.personName} />
          </View>
          <Text
            text="The facilities we include are based on a one kilometer radius. A ten-minute walk or a three-minute drive at most"
            style={styles.infoText}
            containerStyle={styles.flex1}
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
    borderRadius: 12,
    width: '100%',
    justifyContent: 'space-between',
    height: Dimensions.get('screen').height * 0.5,
  },
  headText: {fontSize: Fonts.lg},
  personName: {fontWeight: '600'},
  infoText: {fontSize: Fonts.sm},
});

export default HelpModal;
