export enum Command {
  Check = 'CHCK',
  Control = 'CTRL',
  DataRequest = 'DREQ',
  DataTransmitRequest = 'DTXR',
  Reset = 'RSET',
}

export interface DeviceInfo {
  deviceModel: string;
  firmwareVersion: string;
  hardwareVersion: string;
  uId: string;
  deviceName: string;
  profileId: string;
}
