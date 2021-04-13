import _ from 'lodash';
import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Linking,
  ActivityIndicator,
  Platform,
  Text as RNText,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import {useDarkMode} from 'react-native-dynamic';
import Ionicon from 'react-native-vector-icons/Ionicons';
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
  setEmoji: any;
  backToTop: any;
  notificationRef: any;
}

function replace(array: any[], index: number, replacement: any) {
  return array
    .slice(0, index)
    .concat([replacement])
    .concat(array.slice(index + 1));
}

const MattalHero: React.FC<MattalHeroProps> = ({
  mattal,
  setEmoji,
  backToTop,
  notificationRef,
}) => {
  const dark = useDarkMode();
  const {top} = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [imageLoading, setImageLoading] = React.useState<boolean[]>(
    _.map(_.range(0, mattal.images.length), () => true),
  );
  const {fcm_token} = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer;

  // @ts-ignore
  const showNotification = () => notificationRef?.current?.show();

  BackHandler.addEventListener('hardwareBackPress', () => {
    backToTop();
    return true;
  });

  return (
    <View key={mattal._id} style={styles.container}>
      <Swiper
        paginationStyle={styles.paginationStyle}
        activeDotColor={Colors.white}
        dotColor={Colors.primary}
        loop={false}>
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
      <View
        style={{
          top: Platform.OS === 'android' ? top - 25 : top,
          ...styles.help,
        }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicon
            name="ios-information-circle-outline"
            size={Fonts.xxxl}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          top: Platform.OS === 'android' ? top - 25 : top,
          ...styles.backToTop,
        }}>
        <TouchableOpacity onPress={() => backToTop()}>
          <Ionicon
            name="chevron-up-outline"
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
          style={styles.supermarketContainer}
          onPress={() => {
            setEmoji('Supermarket');
            showNotification();
          }}>
          <RNText style={styles.supermarket}>🍫</RNText>
        </TouchableOpacity>
      )}
      {mattal.facilities.food && (
        <TouchableOpacity
          style={{
            ...styles.foodContainer,
            right: mattal.facilities.supermarket ? 55 : 15,
          }}
          onPress={() => {
            setEmoji('Restaurant');
            showNotification();
          }}>
          <RNText style={styles.food}>🍔</RNText>
        </TouchableOpacity>
      )}
      <Button
        outlined
        text="Take me to the Mattal"
        onPress={() => Linking.openURL(mattal.maps_url)}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
      />
      <HelpModal isVisible={modalVisible} setModalVisible={setModalVisible} />
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
    right: 15,
  },
  backToTop: {
    position: 'absolute',
    left: 15,
  },
  areaContainer: {
    position: 'absolute',
    left: 12,
    bottom: Platform.select({ios: 125, android: 150}),
  },
  name: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Fonts.xl,
  },
  nameContainer: {
    position: 'absolute',
    left: 12,
    bottom: Platform.select({ios: 95, android: 120}),
  },
  area: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: Fonts.lg,
  },
  supermarketContainer: {
    position: 'absolute',
    right: 15,
    bottom: Platform.select({ios: 45, android: 70}),
  },
  supermarket: {
    fontWeight: '500',
    fontSize: Fonts.xl,
  },
  foodContainer: {
    position: 'absolute',
    right: 55,
    bottom: Platform.select({ios: 45, android: 70}),
  },
  food: {
    fontWeight: '500',
    fontSize: Fonts.xl,
  },
  buttonContainer: {
    position: 'absolute',
    left: 10,
    bottom: Platform.select({ios: 40, android: 70}),
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: Fonts.md,
  },
  paginationStyle: {
    bottom: Platform.select({ios: 17, android: 50}),
  },
});

export default MattalHero;
