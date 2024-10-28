import { Injectable } from '@nestjs/common';
import { FiberyDataSource } from '../fibery.datasource';
import { IFiberyId } from '../interfaces/common/fibery-id.interface';

@Injectable()
export class FiberyLinkedInAutomatorAccountService {
  constructor(private readonly fiberyDataSource: FiberyDataSource) {}

  public async fetchAccountIdByToken(token: string): Promise<string> {
    const data = await this.fiberyDataSource.queryEntity<Array<IFiberyId>>(
      {
        'q/from': 'LinkedIn Automation/Account',
        'q/select': ['fibery/id'],
        'q/where': ['=', ['LinkedIn Automation/Token'], '$token'],
        'q/limit': 1,
      },
      {
        $token: token,
      },
    );

    return data[0]!['fibery/id'];
  }
}
