import _ from 'lodash';
import React, {useRef} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import {useDarkMode} from 'react-native-dynamic';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Notification} from 'react-native-in-app-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ConfigsReducer} from '../Action/types';
import Button from '../Components/Button';
import HelpModal from '../Components/HelpModal';
import Text from '../Components/Text';
import {API_URL, API_VERSION} from '../Configs';
import {RootState} from '../Reducer';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import {Mattal} from '../types';

interface MattalHeroProps {
  mattal: Mattal;
}

function replace(array: any[], index: number, replacement: any) {
  return array
    .slice(0, index)
    .concat([replacement])
    .concat(array.slice(index + 1));
}

const MattalHero: React.FC<MattalHeroProps> = ({mattal}) => {
  const dark = useDarkMode();
  const {top} = useSafeAreaInsets();
  const notificationRef = useRef(null);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [emoji, setEmoji] = React.useState<'Supermarket' | 'Restaurant'>();
  const [imageLoading, setImageLoading] = React.useState<boolean[]>(
    _.map(_.range(0, mattal.images.length), () => true),
  );
  const {fcm_token} = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer;

  // @ts-ignore
  const showNotification = () => notificationRef?.current?.show();

  return (
    <View key={mattal._id} style={styles.container}>
      <Swiper showsPagination={false} loop={false}>
        {mattal.images.map((image, i) => (
          <>
            <Image
              style={styles.image}
              source={{
                uri: `${API_URL}/${API_VERSION}/upload/${image.filename}`,
                headers: {
                  Authorization: `Bearer ${fcm_token}`,
                },
              }}
              onLoadStart={() =>
                setImageLoading(replace(imageLoading, i, true))
              }
              onLoad={() => setImageLoading(replace(imageLoading, i, false))}
              resizeMode="cover"
            />
            {imageLoading[i] && (
              <ActivityIndicator
                size="large"
                color={dark ? Colors.secondary : Colors.primary}
                style={styles.loader}
              />
            )}
          </>
        ))}
      </Swiper>
      <View style={{top, ...styles.help}}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicon
            name="ios-information-circle-outline"
            size={Fonts.xxxl}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <Text
        text={mattal.name}
        style={styles.name}
        containerStyle={styles.areaContainer}
      />
      <Text
        text={mattal.area}
        style={styles.area}
        containerStyle={styles.nameContainer}
      />
      {mattal.facilities.supermarket && (
        <TouchableOpacity
          onPress={() => {
            setEmoji('Supermarket');
            showNotification();
          }}>
          <Text
            text={'🍫'}
            style={styles.supermarket}
            containerStyle={styles.supermarketContainer}
          />
        </TouchableOpacity>
      )}
      {mattal.facilities.food && (
        <TouchableOpacity
          onPress={() => {
            setEmoji('Restaurant');
            showNotification();
          }}>
          <Text
            text={'🍔'}
            style={styles.food}
            containerStyle={{
              ...styles.foodContainer,
              right: mattal.facilities.supermarket ? 50 : 12,
            }}
          />
        </TouchableOpacity>
      )}
      <Button
        text="Take me to the Mattal"
        onPress={() => Linking.openURL(mattal.maps_url)}
        outlined
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
      />
      <HelpModal isVisible={modalVisible} setModalVisible={setModalVisible} />
      <Notification
        duration={1500}
        ref={notificationRef}
        textColor={dark ? Colors.white : Colors.primary}
        blurType={dark ? 'dark' : 'xlight'}
        text={`${emoji === 'Supermarket' ? '🍫' : '🍔'} ${emoji} Nearby`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  help: {
    position: 'absolute',
    right: 10,
  },
  areaContainer: {
    position: 'absolute',
    left: 12,
    bottom: 120,
  },
  name: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Fonts.xl,
  },
  nameContainer: {
    position: 'absolute',
    left: 12,
    bottom: 90,
  },
  area: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: Fonts.lg,
  },
  supermarketContainer: {
    position: 'absolute',
    right: 12,
    bottom: 40,
  },
  supermarket: {
    fontWeight: '500',
    fontSize: Fonts.xl,
  },
  foodContainer: {
    position: 'absolute',
    right: 50,
    bottom: 40,
  },
  food: {
    fontWeight: '500',
    fontSize: Fonts.xl,
  },
  buttonContainer: {
    position: 'absolute',
    left: 10,
    bottom: 35,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: Fonts.md,
  },
});

export default MattalHero;
