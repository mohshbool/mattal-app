import React from 'react';
import * as _ from 'lodash';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

import {apiRequest} from '../API';
import AreaCard from '../Components/AreaCard';
import {Colors} from '../Theme/Theme';
import {ConfigsReducer} from '../Action/types';
import {RootState} from '../Reducer';

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
