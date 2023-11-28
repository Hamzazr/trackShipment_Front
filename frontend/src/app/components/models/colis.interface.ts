import { Recipient } from "./recipient.interface";
import { Transporteur } from "./trans.interface";
import { User } from "./user.interface";

export interface Colis {
    id_colis?: number;
    trackingNumber: String;
    countryOrigin: String;
    countryDestination: String;
    title: String;
    orderNumber: String;
    transporteur?: Transporteur;
    recipient?: Recipient;
    user: User;
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