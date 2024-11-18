export interface IProxyConfig {
  ip: string;
  port: number;
  type: 'http' | 'https' | 'socks5';
  username: string;
  password: string;
}
