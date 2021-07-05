import * as React from 'react';
import '../App.scss';
import { Ticket } from '../api';
import { TicketComponent } from './Ticket';
import { api }  from '../App';
import PaginationComponent from './Pagination';
import { SearchComponent } from './Search';
import {FilterComponent} from "./Filter";



export type TicketsState ={
    tickets?: Ticket[];
    search: string;
    restore: boolean;
    bgColor: string;
    page: number;
    totalPages: number;
    filter: string,
    filterVal: string,
    totalResults: number;
    hidden: number;
    hideList: string[];
}



export class TicketsComponent extends React.Component {

    state: TicketsState = {
        search: '',
        restore: false,
        bgColor: 'light',
        page: 1,
        totalPages: 1,
        filter:'',
        filterVal:'',
        totalResults:0,
        hidden: 0,
        hideList:[]
    }


    async componentDidMount() {
        await this.getTickets();
    }


    onHideChange = (ticketId: string) => {
        const l = this.state.hideList.concat([ticketId])
        this.setState({ hidden: this.state.hidden + 1 ,
                            hideList:l})
        this.getTickets();
    }

    onRestoreChange = () => {
        this.setState({ restore: false});

    }

    onClone = async (ticket: Ticket) => {
        const t = await api.cloneTicket(ticket)
        await this.getTickets();
    }

    renderCloneButton = (ticket:Ticket) => {
        return (<button className={this.state.bgColor} onClick={() => this.onClone(ticket)}> Clone </button>)
    }

    renderTickets = () => {
        const { tickets } = this.state;
        return (
            <ul className='tickets'>
                {tickets ? tickets.map(
                    (ticket) => !this.checkHide(ticket)&&(< li key={ticket.id} className='ticket' id={this.state.bgColor} >
                        <TicketComponent ticket={ticket} restore={this.state.restore} onHideChange={this.onHideChange} onRestoreChange={this.onRestoreChange} onClone={this.onClone} bgColor={this.state.bgColor} />
                        {this.renderCloneButton(ticket)}
                    </li>)):null
                }
            </ul>);
    }

    checkHide = (ticket:Ticket)=>{
       return this.state.hideList.includes(ticket.id)
    }

    onDarkMode = () => {
        this.setState({ bgColor: 'dark' })
    }

    onLightMode = () => {
        this.setState({ bgColor: 'light' })
    }

    onRestore = () => {
        this.setState({ restore: true ,
        hidden: 0,
        hideList:[]})

    }

    getTickets = async (page?: number , search?:string, filter?:string, filterVal?:string) => {
        const pageNumber = page ? page : 1;
        const searchWord = search ? search : '';
        const f = filter ? filter : '';
        const filterValue = filterVal ? filterVal : '';
        const t = await api.getTickets(pageNumber, searchWord, f, filterValue);
        this.setState({
            tickets: t.data,
            page: pageNumber,
            totalPages: t.numberOfPages,
            totalResults: t.numberOfResults,
            search: search ? search : ''
        });
    }

    onChange = (page: number) => {
        this.getTickets(page).then(r => r);
    }

    onSearchChange = (search: string) => {
        this.getTickets(undefined, search, this.state.filter, this.state.filterVal).then(r => r);;
    };


    onFilterValChange = (filterVal: string, filter: string, search?: string ) => {
        this.getTickets(undefined, undefined, filter, filterVal).then(r => r);
        this.setState({
            filter:filter,
            filterVal:filterVal
        });
    }

    renderRestore = (tickets?:Ticket[]) => {
        return tickets ? this.state.hidden > 0 ? this.state.hidden > 1 ? < div className='results'>Showing {this.state.totalResults} results ({this.state.hidden} hidden tickets<a href={"#"} onClick={this.onRestore}> - restore</a>)</div> :
            < div className='results'>Showing {this.state.totalResults} results ({this.state.hidden} hidden ticket<a href={"#"} onClick={this.onRestore}> - restore</a>)</div> :
            < div className='results'>Showing {this.state.totalResults} results</div> : null
    }

    render() {
        const { tickets } = this.state;
        return (<div>
            <FilterComponent  onFilterValChange={this.onFilterValChange}/>
            <br/>
            <SearchComponent onSearchChange={this.onSearchChange} />
            {this.state.bgColor === 'light' ? < button id='dark' onClick={this.onDarkMode}> Dark Mode </button> : <button id='light' onClick={this.onLightMode} > Light Mode </button>}
            {this.renderRestore(tickets)}
            <PaginationComponent page={this.state.page} totalPages={this.state.totalPages} onChange={this.onChange} bgColor={this.state.bgColor}/>
            {tickets ? this.renderTickets() : <h2>Loading..</h2>}
        </div>)
    }
}
