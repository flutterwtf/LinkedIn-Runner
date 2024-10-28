import { IProxyConfig } from '../../common/interfaces/proxy-config.interface';

export abstract class ProxyService {
  abstract createProxy(location: string): Promise<IProxyConfig>;
}
