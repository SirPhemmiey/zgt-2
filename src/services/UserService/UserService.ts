import { User, UserDao } from "./UserDao";
import * as bcrypt from 'bcrypt';

export const saltRounds = bcrypt.genSaltSync(10);

export class UserService {

    constructor(private userDao: UserDao) {}

    async create(form: User) {
        const hash = await bcrypt.hash(form.password, saltRounds);
        return this.userDao.upsert("61ded6d3248bfc0030304e6d", {
            name: form.name,
            password: hash,
            email: form.email,
        }).then(async (userId) => {
            return userId;
        }) 
    }
}