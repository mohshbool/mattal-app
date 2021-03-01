export const UPDATE_SELECTED_AREA = 'UPDATE_SELECTED_AREA';

export interface AreaReducer {
  selectedArea: string;
}

interface UpdateSelectedArea {
  type: typeof UPDATE_SELECTED_AREA;
  payload: string;
}

export type ActionTypes = UpdateSelectedArea;
