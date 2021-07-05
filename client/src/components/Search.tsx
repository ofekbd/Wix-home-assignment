import * as React from 'react';
import '../App.scss';
import { createApiClient } from '../api';



export type SearchState = {
    search: string,
    filter: string,
    filterVal:string
}

export type Props = {
    onSearchChange: Function;
}

export const api = createApiClient();

export class SearchComponent extends React.PureComponent<Props, SearchState> {

    state:SearchState = {
        search: '',
        filter: '',
        filterVal:''
    };

    searchDebounce: any = null;


    onSearch = async (val: string, newPage?: number) => {

        clearTimeout(this.searchDebounce);
        this.props.onSearchChange(val)
        this.searchDebounce = setTimeout(async () => {
            this.props.onSearchChange(this.state.search, this.state.filter, this.state.filterVal)
            this.setState({
                search: val
            });
        }, 300);
    }


    handleInputChange = (value: string) => {
        this.setState({
            filterVal: value
        })
    }

    render() {
        return <header>
            <input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)} />
        </header>
    }



}