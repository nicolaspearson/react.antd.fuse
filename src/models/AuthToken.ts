import { User } from 'models/User';

export interface AuthToken {
	token: string;
	user: User;
}
