import {ActionTypes, AreaReducer, UPDATE_SELECTED_AREA} from '../Action/types';

const initialState: AreaReducer = {
  selectedArea: '',
};

export default (state = initialState, action: ActionTypes): AreaReducer => {
  switch (action.type) {
    case UPDATE_SELECTED_AREA:
      return {
        ...state,
        selectedArea: action.payload,
      };
    default:
      return state;
  }
};
