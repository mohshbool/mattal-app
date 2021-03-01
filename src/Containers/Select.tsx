import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AreaCard from '../Components/AreaCard';
import {Colors} from '../Theme/Theme';

const data = [
  {id: '321h', name: 'Dabouq'},
  {id: '321h2', name: 'Abdoun'},
  {id: '321h3', name: 'Fuhies'},
  {id: '321h4', name: 'Jubieha'},
];

const Select: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={data}
          numColumns={2}
          contentContainerStyle={styles.list}
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
