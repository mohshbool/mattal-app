import React from 'react';
import * as _ from 'lodash';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Platform,
  StatusBar,
  BackHandler,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {apiRequest} from '../API';
import AreaCard from '../Components/AreaCard';
import {Colors} from '../Theme/Theme';
import Text from '../Components/Text';
import Fonts from '../Theme/Fonts';
import InfoModal from '../Components/InfoModal';
import Button from '../Components/Button';
import {Mattal} from '../types';
import {updateSelectedArea} from '../Action';
import {useDarkMode} from 'react-native-dynamic';

interface SelectProps {
  todaysMattal?: Mattal;
  setMattals: any;
  goToMattals: any;
}

const Select: React.FC<SelectProps> = ({
  todaysMattal,
  // setMattals,
  goToMattals,
}) => {
  const dispatch = useDispatch();
  const dark = useDarkMode();
  const {top} = useSafeAreaInsets();
  const [areas, setAreas] = React.useState<string[]>([]);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [alreadyFetched, setAlreadyFetched] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (areas.length === 0 && !alreadyFetched) {
      apiRequest<string[]>({
        url: '/mattal/areas',
      })
        .then((req) => {
          setAreas(req);
          setAlreadyFetched(true);
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areas, alreadyFetched]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    setModalVisible(false);
    return false;
  });

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: dark ? Colors.primary : Colors.background,
            paddingTop:
              Platform.OS === 'ios'
                ? top + 5
                : (StatusBar.currentHeight || 0) + 5,
          },
        ]}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.instagram.com/mattal.app')
              }>
              <Ionicon
                name="ios-logo-instagram"
                size={Fonts.xxxl}
                color={dark ? Colors.secondary : Colors.primary}
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
                color={dark ? Colors.secondary : Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        {!todaysMattal || !areas ? (
          <ActivityIndicator
            size="large"
            color={dark ? Colors.secondary : Colors.primary}
            style={styles.loader}
          />
        ) : (
          <>
            <Button
              text={`Today's Mattal: ${todaysMattal?.name}`}
              onPress={() => {
                // setMattals([todaysMattal]);
                dispatch(updateSelectedArea(todaysMattal?.area));
                setTimeout(goToMattals, 200);
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
              renderItem={({item}) => (
                <AreaCard label={item.name} goToMattals={goToMattals} />
              )}
            />
          </>
        )}
        <InfoModal isVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </View>
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
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
