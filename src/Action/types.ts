export const UPDATE_CONFIGS = 'UPDATE_CONFIGS';
export const UPDATE_SELECTED_AREA = 'UPDATE_SELECTED_AREA';

export interface ConfigsReducer {
  fcm_token?: string;
}

export interface AreaReducer {
  selectedArea: string;
}

interface UpdateConfigs {
  type: typeof UPDATE_CONFIGS;
  payload: ConfigsReducer;
}

interface UpdateSelectedArea {
  type: typeof UPDATE_SELECTED_AREA;
  payload: string;
}

export type ActionTypes = UpdateConfigs | UpdateSelectedArea;
