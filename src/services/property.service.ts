import { HttpService } from "./base.service";

class PropertyService extends HttpService {
  private readonly prefix: string = "property";

  getDashboardListings = (): Promise<any> =>
    this.get(`${this.prefix}/listings/dashboard`);
  getPropertyListings = (
    search,
    page,
    limit,
    sessionId,
    recommendations
  ): Promise<any> =>
    this.get(
      `${this.prefix}/listings?search=${search}&page=${page}&resPerPage=${limit}&sessionId=${sessionId}&recommendations=${recommendations}`
    );
  getPropertyDetail = (id): Promise<any> =>
    this.get(`${this.prefix}/detail?id=${id}`);
  fetchRecommendations = (payload: any): Promise<any> =>
    this.postWithOurBaseUrl(`https://bardd-search-pt.hf.space/search`, payload);
  getPropertyRecommendations = (): Promise<any> =>
    this.getWithOutBaseUrl(`https://bardd-rec-pt.hf.space/recommendations`);
}
// nextEnergy;

export const propertyService = new PropertyService();
