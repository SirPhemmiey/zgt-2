
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDao } from '../UserService/UserDao';

export interface UserClaims {
    email: string 
    userId: string 
}

export interface LoginForm {
    email: string, 
    password: string,
}

export interface GenerateTokenForm {
    email: string, 
    userId: string,
}

export interface UserTokenResponse {
    token: string
}

export class AuthService {

    constructor(
        private dao: UserDao,
    ) {}

    async login(form: LoginForm) {
        const user = await this.dao.getByEmail({
            email: form.email.trim().toLowerCase(),
        });
        if (!user._id) {
            console.error('Error: %o', 'Email or passwod is incorrect');
            throw new Error('Email or passwod is incorrect');
        }
        const match = await bcrypt.compare(form.password, user.password);
        if (!match) {
            console.error('Error: %o', 'Email or Passwod is incorrect');
            throw new Error('Email or Passwod is incorrect');
        }
        const token = await this.generateToken({email: user.email, userId: user._id})
        return {
            token: token.token,
            id: user._id,
        };
    }

    async generateToken(form: GenerateTokenForm) {
        const userClaims: UserClaims = {
            email: form.email,
            userId: form.userId
        };
        const token = jwt.sign(userClaims, 'secretKey', { expiresIn: '24h' });
        const response: UserTokenResponse = {
            token: token,
        }
        return response;
    }

    async verifyToken(token: string) {
        try {
            const v = jwt.verify(token, 'secretKey');
            return v;
        } catch (error) {
            console.error('Error while verifying token:', error);
            throw new Error('Unauthorized. Invalid Token')
        }
    }

}