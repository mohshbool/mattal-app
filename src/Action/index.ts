import {ActionTypes, UPDATE_SELECTED_AREA} from './types';

export const updateSelectedArea = (area: string): ActionTypes => ({
  type: UPDATE_SELECTED_AREA,
  payload: area,
});
