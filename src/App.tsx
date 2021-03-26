import React from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {store} from './Store';
import Splash from './Containers/Splash';
import Home from './Containers/Home';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Select: undefined;
};

const persistor = persistStore(store);
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
