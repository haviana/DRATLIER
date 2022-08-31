import { AuthService } from './auth/auth.service';
import { MyAppService } from './my-app.service';
export declare class MyAppController {
    private readonly myAppService;
    private readonly authService;
    constructor(myAppService: MyAppService, authService: AuthService);
    getHello(): string;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
