interface IUser {
    id: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    photo: string;
}

export interface AuthContextType {
    user: IUser;
    signIn: (username: string, password: string) => void
}