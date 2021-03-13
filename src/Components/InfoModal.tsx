import React, {Dispatch, SetStateAction} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
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
    <Modal isVisible={isVisible} onBackdropPress={closeModal}>
      <View style={styles.container}>
        <Text
          text="Mattal is a cross-platform application developer with ❤️ in Jordan by teenagers"
          style={styles.headText}
          containerStyle={styles.headContainer}
        />
        <View style={styles.infoContainer}>
          <View style={styles.personContainer}>
            <Text text="Mohammad Shbool 👾💻" />
            <View style={styles.iconsRow}>
              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:alshboolmoh@gmail.com')}>
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
            <Text text="Mahmoud Ameri 👨🏽‍🔧🏎" />
            <View style={styles.iconsRow}>
              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:m.alameri1@gju.edu.jo')}>
                <Ionicon
                  name="ios-mail-outline"
                  size={Fonts.xxxl}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.instagram.com/mahmood_al3ameri')
                }>
                <Ionicon
                  name="ios-logo-instagram"
                  size={Fonts.xxxl}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.facebook.com/mahmood.alameri.9')
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: '55%',
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  headContainer: {
    flex: 1,
    paddingTop: 30,
    marginBottom: -40,
  },
  headText: {
    fontSize: Fonts.lg,
  },
  infoContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  personContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  iconsRow: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
  },
});

export default InfoModal;
