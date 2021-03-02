export interface CreateDeviceResponse {
  _id: string;
  fcm_token: string;
  os: string;
  notifications_enabled: boolean;
  created_at: Date;
}
