import React from 'react';
import * as _ from 'lodash';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

import {apiRequest} from '../API';
import AreaCard from '../Components/AreaCard';
import {Colors} from '../Theme/Theme';
import {ConfigsReducer} from '../Action/types';
import {RootState} from '../Reducer';
import Text from '../Components/Text';
import Fonts from '../Theme/Fonts';

const Select: React.FC = () => {
  const [areas, setAreas] = React.useState<string[]>([]);
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
            <Text text="Mattal" style={styles.headerText} />
          </View>
          <View>
            <TouchableOpacity onPress={() => console.log('')}>
              <Ionicon
                name="ios-information-circle-outline"
                size={Fonts.xxxl}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
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
      </View>
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
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: Fonts.xl,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  list: {
    flex: 1,
    paddingTop: 8,
    width: '100%',
    alignItems: 'center',
  },
});

export default Select;
