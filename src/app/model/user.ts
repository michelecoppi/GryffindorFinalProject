export interface User {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    age?: number;
    gender?: string;
    subscriptionDate: string;
    stillSmoker: boolean;
    startingDailyCigNums: number;
    eachCigPrice: number;
    dailyCigNum: number;
    }