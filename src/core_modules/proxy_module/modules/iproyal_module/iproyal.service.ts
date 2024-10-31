import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IProxyConfig } from '@common/interfaces/proxy-config.interface';
import { ERROR_MESSAGE } from '@core_modules/proxy_module/errors/error-message';
import { setTimeout } from 'timers/promises';
import { ProxyService } from '@core_modules/proxy_module/proxy.abstract.service';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { IIpRoyalResponse } from './interfaces/iproyal-response.interface';
import { IProduct } from './interfaces/product.interface';
import { ICreateOrderConfig } from './interfaces/create-order-config.interface';
import { IOrder } from './interfaces/order.interface';
import { ORDER_STATUS } from './constants/order-status';

@Injectable()
export class IpRoyalService implements ProxyService {
  private readonly axios: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    const hostUrl = 'https://apid.iproyal.com';
    const apiToken = this.configService.getOrThrow<string>('ipRoyalConfig.apiToken');

    this.axios = axios.create({
      baseURL: `${hostUrl}/v1/reseller`,
      headers: {
        'X-Access-Token': apiToken,
      },
    });
  }

  public async createProxy(location: string): Promise<IProxyConfig> {
    // это для теста на dev, потом уберу
    // eslint-disable-next-line no-console
    console.log(location);
    // const productConfig = await this.fetchProductConfig(location);
    // return this.createOrder(productConfig);

    return {
      type: 'http',
      ip: '46.20.105.210',
      port: 12323,
      username: '14a4996672aa6',
      password: 'd6728c0f20',
    };
  }

  private async createOrder(config: ICreateOrderConfig): Promise<IProxyConfig> {
    try {
      const { data: order }: { data: IOrder } = await this.axios.post('/orders', {
        ...config,
      });

      if (!order) {
        throw new Error(ERROR_MESSAGE.orderError);
      }

      const proxyConfig: IProxyConfig = {
        ...order.proxy_data.proxies[0]!,
        port: order.proxy_data.ports['http|https'],
        type: 'http',
      };

      if (order.status === ORDER_STATUS.inProgress) {
        const refreshedOrder = await this.refreshOrderUnlessNotConfirmed({ orderId: order.id });
        const refreshedProxyConfig = refreshedOrder.proxy_data.proxies[0]!;

        proxyConfig.ip = refreshedProxyConfig.ip;
        proxyConfig.password = refreshedProxyConfig.password;
        proxyConfig.username = refreshedProxyConfig.username;
      }

      return proxyConfig;
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorBody = err.response?.data?.error;
        throw new Error(`${errorBody?.code}: ${errorBody?.message}`);
      }

      throw err;
    }
  }

  private async refreshOrderUnlessNotConfirmed({
    orderId,
    maxRetries = 3,
    retryDelay = 5000,
  }: {
    orderId: number;
    maxRetries?: number;
    retryDelay?: number;
  }) {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const order: IOrder = await this.refreshOrder(orderId);

        if (order.status === ORDER_STATUS.inProgress) {
          return order;
        }

        retries += 1;
        await setTimeout(retryDelay);
      } catch {
        retries += 1;
        await setTimeout(retryDelay);
      }
    }

    throw new Error(ERROR_MESSAGE.maxRetries);
  }

  private async refreshOrder(orderId: number): Promise<IOrder> {
    const { data }: { data: IOrder } = await this.axios.get(`/orders/${orderId}`);

    return data;
  }

  private async fetchProductConfig(locationName: string): Promise<ICreateOrderConfig> {
    const PRODUCT_NAME = 'Static Residential';
    const PLANE_NAME = '30 Days';

    const { data }: { data: IIpRoyalResponse<IProduct> } = await this.axios.get('/products');
    const products = data.data;

    const product = products.find((item) => item.name === PRODUCT_NAME)!;
    const plan = product.plans.find((item) => item.name === PLANE_NAME)!;
    const location = product.locations.find((item) => item.name === locationName);

    if (!location) {
      throw new Error(ERROR_MESSAGE.noProxyLocation);
    }

    return {
      product_id: product.id,
      product_plan_id: plan.id,
      product_location_id: location.id,
      quantity: 1,
    };
  }
}
