export interface WifiNetwork {
    SSID: string;
    BSSID: string;
    capabilities: string;
    frequency: string;
    level: number;
    security: string;
    channelWidth: string;
    distance: string;
    hasPassword: boolean;
}
export interface NetworkDetails {
    type: string;
    state: string;
    isConnected: boolean;
    isConnectedToInternet?: boolean;
    canConnectToRouter?: boolean;
    isConnectedToWifi?: boolean;
}
export interface ConnectedDeviceInfo {
    ipAddress: string;
    deviceName: string;
    localHost: boolean;
    loopbackAddress: boolean;
    hostAddress: string;
    canonicalHostName: string;
    multicastAddress: boolean;
    siteLocalAddress: boolean;
}

export interface WifiDetails {
    iswifienabled: boolean;
    issupportwifi: boolean;
    ssid: string;
    bssid: string;
    ip: string;
    mac: string;
    networkid: number;
    linkspeed: number;
    signalstrength: number;
    gateway: string;
    rssi: number;
    speed: number;
    frequency: number;
    channel: number;
    dns1: string;
    dns2: string;
}


export interface PingResponse {
    line?: string;
    fullResponse?: string;
    progress?: number;
    status?: string;
    linesRead?: number;
}

export interface IpInfo {
    type: string;
    signal: number;
    speed: number;
    ssid: string;
    internalip: string;
    macaddress: string;
    networkid: number;
    frequency: number;
    bssid: string;
    dns1: string;
    dns2: string;
    timezone: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    street?: string;
    country?: string;
    region?: string;
    zipcode?: string;
    state?: string;
}
export default class WifiManager {
    getWifiList(): Promise<WifiNetwork[]>;
    getIpInfo(): Promise<IpInfo[]>;
    getAllWifiDetails(): Promise<WifiDetails>;
    isConnectedToInternet(): Promise<boolean>;
    canConnectToInternet(): Promise<number>;
    canConnectToRouter(): Promise<boolean>;
    connectToNetwork(ssid: string, password: string): Promise<void>;
    disconnectFromNetwork(): Promise<void>;
    isWifiEnabled(): Promise<boolean>;
    wifiToggle(): Promise<void>;
    checkAndRequestWifiPermission(): Promise<string>;
    getConnectedDevices(): Promise<ConnectedDeviceInfo[]>;
    getWifiStrength(): Promise<number>;
    getSignalStrength(): Promise<number>;
    ping(address: string, count: number, timeout: number, successCallback: (response: PingResponse) => void, errorCallback: (error: any) => void): void;

}
