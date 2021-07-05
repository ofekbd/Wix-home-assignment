import * as React from 'react';
import '../App.scss';

export type FilterState = {
    selectedFilter: string,
    filterValue: string
};

type Props = {
    onFilterValChange: Function;
}

export class FilterComponent extends React.PureComponent<Props, FilterState> {

    state: FilterState = {
        selectedFilter: '',
        filterValue: ''
    }

    handleSelectionChange = (value: string) => {
        this.setState({
            selectedFilter: value
        })
        this.props.onFilterValChange(this.state.filterValue, this.state.selectedFilter);
    }

    handleSelectionValueChange = (value:string)=>{
        this.setState({
            filterValue: value
        });
        this.props.onFilterValChange(value, this.state.selectedFilter);
    }

    render() {
        return <>
            <label>Filter</label>
            <div><select className = 'filter-select'onChange={(e) => this.handleSelectionChange(e.target.value)}>
                <option value=''></option>
                <option value='after'>After</option>
                <option value='before'>Before</option>
                <option value='from' >From</option>
            </select></div>
            {this.state.selectedFilter === 'after' || this.state.selectedFilter === 'before' ?
                <input className = 'filter-select' type='date' onChange={(e) => this.handleSelectionValueChange(e.target.value)}/> : this.state.selectedFilter === 'from' ?
                    <input className = 'filter-select' type='email' placeholder="please enter email" onChange={(e) => this.handleSelectionValueChange(e.target.value)}/>
                    : null
            }
            <br/>
        </>
    }
}