import { HttpService } from "./base.service";

class AuthService extends HttpService {
  private readonly prefix: string = "auth";

  signUp = (body: any): Promise<any> =>
    this.post(`${this.prefix}/signup`, body);
  login = (body: any): Promise<any> => this.post(`${this.prefix}/login`, body);
}

export const authService = new AuthService();
