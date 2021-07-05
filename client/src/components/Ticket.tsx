
import * as React from 'react'
import '../App.scss';
import { Ticket } from '../api';


type Props = {
    ticket: Ticket;
    restore: boolean;
    onHideChange: Function;
    onRestoreChange: Function;
    onClone: Function;
    bgColor: string;
}

export type TicketState = {
    ticket: Ticket;
    showFullText: boolean;
    comments: string[];
};


export class TicketComponent extends React.Component<Props, TicketState> {

    constructor(props:Props) {
        super(props);
        this.state = {
            ticket: props.ticket,
            showFullText: false,
            comments:[]
        };
    }

    onHideClick = (t: Ticket) => {
        this.props.onHideChange(t.id);
        this.props.onRestoreChange();
    }

    onShowMore = () => {
        this.setState({showFullText: true})
    }

    onShowLess = () => {
        this.setState({ showFullText: false })
    }

    renderHideButton = (ticket:Ticket) => {
        return <button className={this.props.bgColor} onClick={() => this.onHideClick(ticket)}> Hide </button>
    }

    renderShowMoreLess = (content:string)=>{
        return <div className='content'> {content.length <= 360  ? content :
            this.state.showFullText ? <div>{content}<br /><button  id ={this.props.bgColor} className = "link" onClick={()=>this.onShowLess()}>See less</button></div> :
                <div>{content.slice(0, 360)}<br /><button className="link" id ={this.props.bgColor} onClick={()=>this.onShowMore()}> See more </button></div>} </div>
    }

    render() {
        const { ticket } = this.state;
        const content = ticket.content;/*.split('\n').map((s)=>s+'\n');*/
        let element =
            <>
                {this.renderHideButton(ticket)}
                <h5 className='title'>{ticket.title}</h5>
                <div>{this.renderShowMoreLess(content)}</div>
                <br></br>
                <footer>
                    <div className='meta-data' id={this.props.bgColor}>By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}</div>
                </footer>
            </>
        return (element);
    }


}
