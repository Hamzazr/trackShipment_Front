import { Transporteur } from "./trans.interface";
import { User } from "./user.interface";

export interface Colis {
    id?: number;

    numero?: number;

    statut?: string; 

    transporteur?: Transporteur;
    
    client?: User;

    description?: string;

    poids?: number;

    emplacement?: string;
}

export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface Links {
    first: string;
    previous: string;
    next: string;
    last: string;
}

export interface ColisPageable {
    items: Colis[];
    meta: Meta;
    links: Links;
}