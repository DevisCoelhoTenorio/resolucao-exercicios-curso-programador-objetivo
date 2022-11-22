export default interface IUser {
    [key: string]: number | string | boolean;
    id: number;
    city: string;
    name: string;
    age: number;
    weight: number;
    sex: string;
    height: number;
    salary: number;
    married: boolean;
    active: boolean;
};