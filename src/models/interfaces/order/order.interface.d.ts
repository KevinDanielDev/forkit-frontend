import type { IClientData } from './client-data.interface';
import type { IFinanceData } from './finance-data.interface';
import type { IProjectData } from './project-data.interface';

interface IOrder {
  objectId?: string;
  client: IClientData;
  project: IProjectData;
  finance: IFinanceData;
}

export type { IOrder };
