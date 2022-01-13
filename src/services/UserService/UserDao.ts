
export interface User {
    name: string;
    password: string
    email: string,
}

export const emptyUserExtended: UserExtended = {
    _id: '',
    name: '',
    email: '',
    password: '',
}

export type UserExtended = { _id: string } & User;

export interface UserDao {
    upsert(id: string, update: Partial<User>): Promise<void>;
    getByEmail(form: { email: string }): Promise<UserExtended>;

}