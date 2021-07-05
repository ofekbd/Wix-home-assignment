import * as React from 'react';

import '../App.scss';

export type PaginationState = {
    page: number,
};

type Props = {
    page: number,
    totalPages: number,
    onChange: Function,
    bgColor:string
};

export class PaginationComponent extends React.Component<Props, PaginationState> {

    state: PaginationState = {
        page: 1
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.page !== prevProps.page) {
            this.setState({
                page: this.props.page,
            });
        }
    }

    jumpToPage = async (page: number) => {
        this.props.onChange(page);
        this.setState({
            page: page,
        });
    };

    render() {
        const page = this.state.page;
        const lastPage = this.props.totalPages;
        return (
            <div>
                <div className={'pagination'} id={this.props.bgColor}>
                    <div className={'paginationCard'} id={this.props.bgColor}>
                        {lastPage > 7 ? <>
                            {page > 1 ? <button id={this.props.bgColor} type='button' className='prevNext' onClick={() => this.jumpToPage(page - 1)}> {'>>'} </button>:null}
                            <button id={this.props.bgColor} type='button' className={page === 1 ? 'curr' : 'page'} onClick={() => this.jumpToPage(1)}> 1 </button>

                            {page > 3 ? <>
                                <button id={this.props.bgColor} type='button' className='prevNext' > {'...'} </button>
                                {page + 2 < lastPage ? <button  id={this.props.bgColor} type='button' className='page' onClick={() => this.jumpToPage(page - 1)}> {page - 1} </button> : null}
                            </> : <>
                                <button id={this.props.bgColor} type='button' className={page === 2 ? 'curr' : 'page'} onClick={() => this.jumpToPage(2)}> 2 </button>
                                <button id={this.props.bgColor} type='button' className={page === 3 ? 'curr' : 'page'} onClick={() => this.jumpToPage(3)}> 3 </button>
                                <button id={this.props.bgColor} type='button' className={page === 4 ? 'curr' : 'page'} onClick={() => this.jumpToPage(4)}> 4 </button>
                                <button id={this.props.bgColor} type='button' className={page === 5 ? 'curr' : 'page'} onClick={() => this.jumpToPage(5)}> 5 </button>
                            </>
                            }

                            {page > 3 && (page + 2 < lastPage) ?
                                <button id={this.props.bgColor} type='button' className='curr'> {page} </button> : null
                            }

                            {page + 2 < lastPage ? <>
                                {page > 3 ? <button type='button' className='page' onClick={() => this.jumpToPage(page + 1)}> {page + 1} </button> : null}
                                <button id={this.props.bgColor} type='button' className='prevNext'> {'...'} </button>
                            </> : <>
                                <button id={this.props.bgColor} type='button' className={page === lastPage - 4 ? 'curr' : 'page'} onClick={() => this.jumpToPage(lastPage - 4)}> {lastPage - 4} </button>
                                <button id={this.props.bgColor} type='button' className={page === lastPage - 3 ? 'curr' : 'page'} onClick={() => this.jumpToPage(lastPage - 3)}> {lastPage - 3} </button>
                                <button id={this.props.bgColor} type='button' className={page === lastPage - 2 ? 'curr' : 'page'} onClick={() => this.jumpToPage(lastPage - 2)}> {lastPage - 2} </button>
                                <button id={this.props.bgColor} type='button' className={page === lastPage - 1 ? 'curr' : 'page'} onClick={() => this.jumpToPage(lastPage - 1)}> {lastPage - 1} </button>
                            </>
                            }

                            <button id={this.props.bgColor} type='button' className={page === lastPage ? 'curr' : 'page'} onClick={() => this.jumpToPage(lastPage)}> {lastPage} </button>
                            {page < lastPage ? <button id={this.props.bgColor} type='button' className='prevNext' onClick={() => this.jumpToPage(page + 1)}> {'<<'} </button>:null}
                        </> : <>
                            {lastPage > 1 ? <button id={this.props.bgColor} type='button' className={page === 1 ? 'curr' : 'page'} onClick={() => this.jumpToPage(1)}> 1 </button> : null}
                            {lastPage >= 2 ? <button id={this.props.bgColor} type='button' className={page === 2 ? 'curr' : 'page'} onClick={() => this.jumpToPage(2)}> 2 </button> : null}
                            {lastPage >= 3 ? <button id={this.props.bgColor} type='button' className={page === 3 ? 'curr' : 'page'} onClick={() => this.jumpToPage(3)}> 3 </button> : null}
                            {lastPage >= 4 ? <button id={this.props.bgColor} type='button' className={page === 4 ? 'curr' : 'page'} onClick={() => this.jumpToPage(4)}> 4 </button> : null}
                            {lastPage >= 5 ? <button id={this.props.bgColor} type='button' className={page === 5 ? 'curr' : 'page'} onClick={() => this.jumpToPage(5)}> 5 </button> : null}
                            {lastPage >= 6 ? <button id={this.props.bgColor} type='button' className={page === 6 ? 'curr' : 'page'} onClick={() => this.jumpToPage(6)}> 6 </button> : null}
                            {lastPage >= 7 ? <button id={this.props.bgColor} type='button' className={page === 7 ? 'curr' : 'page'} onClick={() => this.jumpToPage(7)}> 7 </button> : null}
                        </>}

                    </div>
                </div>
            </div>
        );
    };
}

export default PaginationComponent;