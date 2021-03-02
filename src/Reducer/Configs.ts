import {ActionTypes, ConfigsRedcuer, UPDATE_CONFIGS} from '../Action/types';

const initialState: ConfigsRedcuer = {};

export default (state = initialState, action: ActionTypes): ConfigsRedcuer => {
  switch (action.type) {
    case UPDATE_CONFIGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
