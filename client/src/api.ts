import axios from 'axios';
import {APIRootPath} from '@fed-exam/config';

export type Ticket = {
    id: string;
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
    comments?:string[];
}

export type PaginatedData = {
    data: Ticket[];
    numberOfPages: number;
    numberOfResults: number;
    filter:string;
    filterVal:string;
}


export type ApiClient = {
    getTickets: (page: number, search?:string, filter?:string, filterVal?:string) => Promise<PaginatedData>;
    cloneTicket: (ticketId:Ticket) => Promise<Ticket>;
}


export const createApiClient = (): ApiClient => {
    return {
        getTickets:(page, search,filter,filterVal) => {
            return axios.get(APIRootPath + `?page=${page}&search=${search}&filterWord=${filter}&filterVal=${filterVal}`).then((res) => res.data);
        },

        cloneTicket: (ticket:Ticket) => {
            return axios.post(APIRootPath,ticket).then((res) => res.data);
        }

    }
}

