import React, {Dispatch, SetStateAction} from 'react';
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import Text from './Text';

interface InfoModalProps {
  isVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const InfoModal: React.FC<InfoModalProps> = ({isVisible, setModalVisible}) => {
  const closeModal = () => setModalVisible(false);
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection="up">
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text
            text="Mattal is a cross-platform application developed with ❤️ in Jordan by university students"
            style={styles.headText}
            containerStyle={styles.flex}
          />
          <View style={styles.flex}>
            <View style={styles.personContainer}>
              <Text text="Mohammad Shbool 👾💻" style={styles.personName} />
              <View style={styles.iconsRow}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('mailto:alshboolmoh@gmail.com')
                  }>
                  <Ionicon
                    name="ios-mail-outline"
                    size={Fonts.xxxl}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.instagram.com/mohshbool')
                  }>
                  <Ionicon
                    name="ios-logo-instagram"
                    size={Fonts.xxxl}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.github.com/mohshbool')
                  }>
                  <FeatherIcon
                    name="github"
                    size={Fonts.xxxl}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.personContainer}>
              <Text text="Mahmoud Ameri 👨🏽‍🔧🏎" style={styles.personName} />
              <View style={styles.iconsRow}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('mailto:m.alameri1@gju.edu.jo')
                  }>
                  <Ionicon
                    name="ios-mail-outline"
                    size={Fonts.xxxl}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://www.instagram.com/mahmood_al3ameri',
                    )
                  }>
                  <Ionicon
                    name="ios-logo-instagram"
                    size={Fonts.xxxl}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://www.facebook.com/mahmood.alameri.9',
                    )
                  }>
                  <SimpleLineIcon
                    name="social-facebook"
                    size={Fonts.xxxl}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    borderRadius: 12,
    width: '100%',
    height: Dimensions.get('screen').height * 0.6,
    backgroundColor: Colors.white,
    paddingTop: 30,
    paddingBottom: 20,
  },
  headText: {
    fontSize: Fonts.lg,
    lineHeight: 32,
  },
  personContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  personName: {fontWeight: '600'},
  iconsRow: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
  },
});

export default InfoModal;
