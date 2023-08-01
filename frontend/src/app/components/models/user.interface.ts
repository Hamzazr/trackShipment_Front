import { Colis } from "./colis.interface";

export interface User {
    id?: number;

    first_name?: string;

    last_name?: string;

    adresse?: string;

    ville?: string;

    email?: string;

    password?: string;
    
    colis?: Colis[];

}