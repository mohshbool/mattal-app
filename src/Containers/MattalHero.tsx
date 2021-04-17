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
  StatusBar,
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import {useDarkMode} from 'react-native-dynamic';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ConfigsReducer} from '../Action/types';
import Button from '../Components/Button';
// import HelpModal from '../Components/HelpModal';
import Text from '../Components/Text';
import {API_URL, API_VERSION} from '../Configs';
import {RootState} from '../Reducer';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';
import {Mattal} from '../types';
import RatingModal from '../Components/RatingModal';
import {apiRequest} from '../API';

interface MattalHeroProps {
  mattal: Mattal;
  setEmoji: any;
  backToTop: any;
  notificationRef: any;
  goOneUp?: any;
  currentPage?: number;
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
  goOneUp,
  currentPage,
}) => {
  const dark = useDarkMode();
  const {top, bottom: nativeBottom} = useSafeAreaInsets();
  const [rating, setRating] = React.useState<number>(0);
  const [hasRated, setHasRated] = React.useState<boolean>(false);
  // const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [ratingModalVisible, setRatingModalVisible] = React.useState<boolean>(
    false,
  );
  const [imageLoading, setImageLoading] = React.useState<boolean[]>(
    _.map(_.range(0, mattal.images.length), () => true),
  );
  const {fcm_token} = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer;

  const ratingSubmit = async () => {
    await apiRequest({
      url: '/review/mattal',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${fcm_token}`,
      },
      data: {
        mattal: mattal._id,
        rating: rating,
      },
    })
      .then(() => {
        setRatingModalVisible(false);
        setHasRated(true);
      })
      .catch((e) => {
        console.error(e.message);
        if (e.message === 'Request failed with status code 403') {
          AsyncStorage.clear();
        }
      });
  };

  React.useEffect(() => setHasRated(mattal.ratedByDevice), [
    mattal.ratedByDevice,
  ]);

  const bottom = Platform.OS === 'android' ? nativeBottom : nativeBottom - 15;

  // @ts-ignore
  const showNotification = () => notificationRef?.current?.show();

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (ratingModalVisible) {
      setRatingModalVisible(false);
    } else if (currentPage !== 0) {
      goOneUp();
    } else {
      BackHandler.exitApp();
    }
    return true;
  });

  const noAndroidAndNotIphoneX = Platform.OS === 'android' || bottom > 10;

  return (
    <View key={mattal._id} style={styles.container}>
      <Swiper
        paginationStyle={{
          bottom: bottom + 5 + (noAndroidAndNotIphoneX ? 0 : 12),
        }}
        activeDotColor={Colors.white}
        dotColor={Colors.primary}
        // autoplayTimeout={1.5}
        // autoplay={true}
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
      {!!mattal.rating && (
        <View
          style={{
            top:
              Platform.OS === 'android'
                ? (StatusBar.currentHeight || 24) - 10
                : top,
            ...styles.rateStar,
          }}>
          <TouchableOpacity
            onPress={() => setRatingModalVisible(true)}
            disabled={hasRated}>
            <Ionicon
              name="ios-star"
              size={Fonts.xxxxl}
              color={hasRated ? Colors.primary : Colors.secondary}
            />
          </TouchableOpacity>
        </View>
      )}
      {/*
      <View
        style={{
          top: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) - 10 : top,
          ...styles.help,
        }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicon
            name="ios-information-circle-outline"
            size={Fonts.xxxl}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          top:
            Platform.OS === 'android'
              ? (StatusBar.currentHeight || 24) - 10
              : top,
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
        containerStyle={{...styles.areaContainer, bottom: bottom + 120}}
      />
      <Text
        text={mattal.area}
        style={styles.area}
        containerStyle={{...styles.nameContainer, bottom: bottom + 90}}
      />
      {!!mattal.rating && (
        <Text
          text={'⭐ ' + (Math.floor(mattal.rating * 2) / 2).toString()}
          style={styles.rateText}
          containerStyle={{
            ...styles.ratingContainer,
            bottom:
              bottom +
              (!mattal.facilities.supermarket && !mattal.facilities.food
                ? 30
                : 70),
          }}
        />
      )}
      {mattal.facilities.supermarket && (
        <TouchableOpacity
          style={{
            ...styles.supermarketContainer,
            right: mattal.facilities.food ? 15 : 22,
            bottom: bottom + 30 + (noAndroidAndNotIphoneX ? 0 : 8),
          }}
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
            bottom: bottom + 30 + (noAndroidAndNotIphoneX ? 0 : 8),
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
        containerStyle={{
          ...styles.buttonContainer,
          bottom: bottom + 30 + (noAndroidAndNotIphoneX ? 0 : 8),
        }}
        textStyle={styles.buttonText}
      />
      {/* <HelpModal isVisible={modalVisible} setModalVisible={setModalVisible} /> */}
      <RatingModal
        isVisible={ratingModalVisible}
        setModalVisible={setRatingModalVisible}
        rating={rating}
        setRating={setRating}
        ratingSubmit={ratingSubmit}
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
  rateStar: {
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
  },
  name: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Fonts.xl,
  },
  nameContainer: {
    position: 'absolute',
    left: 12,
  },
  area: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: Fonts.lg,
  },
  supermarketContainer: {
    position: 'absolute',
    right: 15,
  },
  supermarket: {
    fontWeight: '500',
    fontSize: Fonts.xl,
    textAlign: 'center',
    fontFamily: Fonts.extrabold,
  },
  foodContainer: {
    position: 'absolute',
    right: 55,
  },
  food: {
    fontWeight: '500',
    fontSize: Fonts.xl,
  },
  rateText: {
    fontSize: Fonts.l,
    color: Colors.secondary,
  },
  ratingContainer: {
    position: 'absolute',
    right: 20,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  buttonContainer: {
    position: 'absolute',
    left: 10,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: Fonts.md,
  },
});

export default MattalHero;
