import { UserInfo } from './UserInfo';

export class Sesion {

    access_token: string;
    refresh_token: string;
    scope: string;
    id_token: string;
    token_type: string;
    expires_in: number;
    userInfo: UserInfo;
}


