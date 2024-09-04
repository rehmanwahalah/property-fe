import { HttpService } from "./base.service";

class PropertyService extends HttpService {
  private readonly prefix: string = "property";

  getDashboardListings = (): Promise<any> =>
    this.get(`${this.prefix}/listings/dashboard`);
  getClaimedTransactions = (): Promise<any> =>
    this.get(`${this.prefix}/claimed`);
  createTransaction = (body: any): Promise<any> =>
    this.post(`${this.prefix}/create`, body);
  updateTransaction = (body: any): Promise<any> =>
    this.post(`${this.prefix}/update`, body);
}

export const propertyService = new PropertyService();
