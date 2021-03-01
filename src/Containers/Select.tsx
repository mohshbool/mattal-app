import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AreaCard from '../Components/AreaCard';
// import Button from '../Components/Button';
import Input from '../Components/Input';
import Fonts from '../Theme/Fonts';
import {Colors} from '../Theme/Theme';

const data = [
  {id: '321h', name: 'Dabouq'},
  {id: '321h2', name: 'Abdoun'},
  {id: '321h3', name: 'Fuhies'},
];

const Select: React.FC = () => {
  const [search, setSearch] = React.useState('');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Input value={search} onChange={setSearch} placeholder="Dabouq" />
        <FlatList
          data={data}
          style={styles.list}
          renderItem={({item}) => <AreaCard label={item.name} />}
        />
      </View>
    </SafeAreaView>
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
    width: '100%',
    paddingTop: 8,
  },
});

export default Select;
