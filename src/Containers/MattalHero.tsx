import _ from 'lodash';
import React from 'react';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ConfigsReducer} from '../Action/types';
import Button from '../Components/Button';
import HelpModal from '../Components/HelpModal';
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
  const [rating, setRating] = React.useState<number>(0);
  const [hasRated, setHasRated] = React.useState<boolean>(mattal.ratedByDevice);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
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

  // @ts-ignore
  const showNotification = () => notificationRef?.current?.show();

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
      <View style={{top, ...styles.rateStar}}>
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
      {/* <View style={{top, ...styles.help}}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicon
            name="ios-information-circle-outline"
            size={Fonts.xxxl}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View> */}
      <View style={{top, ...styles.backToTop}}>
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
      <Text
        text={'⭐ ' + mattal.rating.toString()}
        style={styles.rateText}
        containerStyle={styles.ratingContainer}
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
        outlined
        text="Take me to the Mattal"
        onPress={() => Linking.openURL(mattal.maps_url)}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
      />
      <HelpModal isVisible={modalVisible} setModalVisible={setModalVisible} />
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
    bottom: 125,
  },
  name: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: Fonts.xl,
  },
  nameContainer: {
    position: 'absolute',
    left: 12,
    bottom: 95,
  },
  area: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: Fonts.lg,
  },
  supermarketContainer: {
    position: 'absolute',
    right: 12,
    bottom: 45,
  },
  supermarket: {
    fontWeight: '500',
    fontSize: Fonts.xl,
  },
  foodContainer: {
    position: 'absolute',
    right: 50,
    bottom: 45,
  },
  food: {
    fontWeight: '500',
    fontSize: Fonts.xl,
  },
  rateText: {
    fontSize: Fonts.l,
  },
  ratingContainer: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  buttonContainer: {
    position: 'absolute',
    left: 10,
    bottom: 40,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: Fonts.md,
  },
  paginationStyle: {
    bottom: 20,
  },
});

export default MattalHero;
