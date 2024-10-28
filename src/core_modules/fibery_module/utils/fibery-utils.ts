import { Injectable } from '@nestjs/common';
import { IFiberySelect } from '../interfaces/common/fibery-select.interface';
import { FiberyDataSource } from '../fibery.datasource';

@Injectable()
export class FiberyUtils {
  constructor(private readonly fiberyDataSource: FiberyDataSource) {}

  public mapSingleSelect(selectValues: Array<IFiberySelect>, enumName: string): string | undefined {
    const rightSingleSelect = selectValues.find((item) => item['enum/name'] === enumName);
    return rightSingleSelect?.['fibery/id'];
  }

  public fetchSelectorValues({
    space,
    db,
    field,
    nameRange,
  }: {
    space: string;
    db: string;
    field: string;
    nameRange?: Array<string>;
  }): Promise<Array<IFiberySelect>> {
    const whereQuery = nameRange ? ['in', 'enum/name', '$names'] : undefined;

    return this.fiberyDataSource.queryEntity<Array<IFiberySelect>>(
      {
        'q/from': `${space}/${field}_${space}/${db}`,
        'q/select': ['enum/name', 'fibery/id'],
        'q/limit': 'q/no-limit',
        'q/where': whereQuery,
      },
      {
        $names: nameRange,
      },
    );
  }

  public async fetchSingleSelectOptionId({
    space,
    db,
    field,
    name,
  }: {
    space: string;
    db: string;
    field: string;
    name: string;
  }): Promise<string> {
    const selectorValues = await this.fetchSelectorValues({
      space,
      db,
      field,
      nameRange: [name],
    });

    return this.mapSingleSelect(selectorValues, name) || '';
  }

  public createSelectValues({
    space,
    db,
    field,
    values,
  }: {
    space: string;
    db: string;
    field: string;
    values: Array<string>;
  }) {
    return this.fiberyDataSource.createEntityBatch<Array<IFiberySelect>>(
      values.map((value) => ({
        type: `${space}/${field}_${space}/${db}`,
        entity: {
          'enum/name': value,
        },
      })),
    );
  }
}
