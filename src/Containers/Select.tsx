import React from 'react';
import * as _ from 'lodash';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {apiRequest} from '../API';
import AreaCard from '../Components/AreaCard';
import {Colors} from '../Theme/Theme';
import {ConfigsReducer} from '../Action/types';
import {RootState} from '../Reducer';
import Text from '../Components/Text';
import Fonts from '../Theme/Fonts';
import InfoModal from '../Components/InfoModal';
import Button from '../Components/Button';
import {Mattal} from '../types';
import {updateSelectedArea} from '../Action';

interface SelectProps {
  todaysMattal?: Mattal;
  setMattals: any;
}

const Select: React.FC<SelectProps> = ({todaysMattal, setMattals}) => {
  const dispatch = useDispatch();
  const [areas, setAreas] = React.useState<string[]>([]);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [alreadyFetched, setAlreadyFetched] = React.useState<boolean>(false);
  const {fcm_token} = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer;

  React.useEffect(() => {
    if (areas.length === 0 && !alreadyFetched) {
      apiRequest<string[]>({
        url: '/mattal/areas',
        headers: {
          Authorization: `Bearer ${fcm_token}`,
        },
      })
        .then((req) => {
          setAreas(req);
          setAlreadyFetched(true);
        })
        .catch((e) => {
          console.error(e.message);
          if (e.message === 'Request failed with status code 403') {
            AsyncStorage.clear();
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areas, alreadyFetched]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.instagram.com/mattal.app')
              }>
              <Ionicon
                name="ios-logo-instagram"
                size={Fonts.xxxl}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text text="Mattal 🇯🇴" style={styles.headerText} />
          </View>
          <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicon
                name="ios-information-circle-outline"
                size={Fonts.xxxl}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        {!todaysMattal || !areas ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={styles.loader}
          />
        ) : (
          <>
            <Button
              text={`Today's Mattal: ${todaysMattal?.name}`}
              onPress={() => {
                setMattals([todaysMattal]);
                dispatch(updateSelectedArea(todaysMattal?.area));
              }}
              textStyle={styles.todaysText}
              containerStyle={styles.todaysTextContainer}
            />
            <FlatList
              data={_.map(areas, (name, index) => ({
                name,
                index,
              }))}
              numColumns={2}
              contentContainerStyle={styles.list}
              keyExtractor={(item) => String(item.index)}
              renderItem={({item}) => <AreaCard label={item.name} />}
            />
          </>
        )}
      </View>
      <InfoModal isVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
    //   <Text
    //   text="Fuhies - Dabouq - Abdoun - Jubieha - Dabouq - Abdoun - Jubieha"
    //   containerStyle={{
    //     position: 'absolute',
    //     transform: [{rotate: '90deg'}],
    //     right: 0,
    //     bottom: '50%',
    //   }}
    //   style={{textAlign: 'left'}}
    // />
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height * 0.02,
    paddingBottom: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: Fonts.xl,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  todaysText: {
    fontSize: Fonts.sm,
  },
  todaysTextContainer: {
    padding: 0,
    width: '96%',
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  list: {
    flex: 1,
    paddingTop: 8,
    width: '100%',
    alignItems: 'center',
  },
});

export default Select;
