import { HttpService } from "./base.service";

class PropertyService extends HttpService {
  private readonly prefix: string = "property";

  getDashboardListings = (): Promise<any> =>
    this.get(`${this.prefix}/listings/dashboard`);
  getPropertyListings = (search, page, limit): Promise<any> =>
    this.get(
      `${this.prefix}/listings?search=${search}&page=${page}&resPerPage=${limit}`
    );
  getClaimedTransactions = (): Promise<any> =>
    this.get(`${this.prefix}/claimed`);
  createTransaction = (body: any): Promise<any> =>
    this.post(`${this.prefix}/create`, body);
  updateTransaction = (body: any): Promise<any> =>
    this.post(`${this.prefix}/update`, body);
}
// nextEnergy;

export const propertyService = new PropertyService();
