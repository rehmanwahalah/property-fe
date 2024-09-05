import { HttpService } from "./base.service";

class PropertyService extends HttpService {
  private readonly prefix: string = "property";

  getDashboardListings = (): Promise<any> =>
    this.get(`${this.prefix}/listings/dashboard`);
  getPropertyListings = (search, page, limit): Promise<any> =>
    this.get(
      `${this.prefix}/listings?search=${search}&page=${page}&resPerPage=${limit}`
    );
  getPropertyDetail = (id): Promise<any> =>
    this.get(`${this.prefix}/detail?id=${id}`);
}
// nextEnergy;

export const propertyService = new PropertyService();
