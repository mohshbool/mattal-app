import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import {ActionTypes} from '../Action/types';
import Area from './Area';

const rootReducer = combineReducers({Area});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState, ActionTypes>(
  {
    key: 'Mattal',
    storage: AsyncStorage,
    blacklist: ['Area'],
  },
  rootReducer,
);

export default persistedReducer;
