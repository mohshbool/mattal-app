export const UPDATE_CONFIGS = 'UPDATE_CONFIGS';
export const UPDATE_SELECTED_AREA = 'UPDATE_SELECTED_AREA';

export interface ConfigsRedcuer {
  fcm_token?: string;
}

export interface AreaReducer {
  selectedArea: string;
}

interface UpdateConfigs {
  type: typeof UPDATE_CONFIGS;
  payload: ConfigsRedcuer;
}

interface UpdateSelectedArea {
  type: typeof UPDATE_SELECTED_AREA;
  payload: string;
}

export type ActionTypes = UpdateConfigs | UpdateSelectedArea;
