import { HttpService } from "./base.service";

class ActivityService extends HttpService {
  private readonly prefix: string = "activity";

  createActivity = (data: any): Promise<any> =>
    this.post(`${this.prefix}/create`, data);
}
// nextEnergy;

export const activityService = new ActivityService();
