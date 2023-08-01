import { Colis } from "./colis.interface";

export interface Transporteur{
    id?: number;

    nom?: string;

    colis?: Colis[];
}