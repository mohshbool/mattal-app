import {
  ActionTypes,
  ConfigsReducer,
  UPDATE_CONFIGS,
  UPDATE_SELECTED_AREA,
} from './types';

export const updateConfigs = (configs: ConfigsReducer): ActionTypes => ({
  type: UPDATE_CONFIGS,
  payload: configs,
});

export const updateSelectedArea = (area: string): ActionTypes => ({
  type: UPDATE_SELECTED_AREA,
  payload: area,
});
