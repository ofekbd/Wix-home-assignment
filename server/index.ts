import express from 'express';
import bodyParser = require('body-parser');
import { tempData } from './temp-data';
import { serverAPIPort, APIPath } from '@fed-exam/config';
import { Ticket } from '../client/src/api';

console.log('starting server', { serverAPIPort, APIPath });

const app = express();

const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get(APIPath, (req, res) => {

  // @ts-ignore
  const page: number = parseInt(req.query.page) || 1;
  const search: string = (<string>(req.query.search)).toLocaleLowerCase() || '';
  const filter: string = <string>(req.query.filterWord) || '';
  const filterVal: string = <string>(req.query.filterVal) || '';
  const filteredData = <any>applySearch(tempData, search, filter, filterVal);
  const paginatedData = {
    data: filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    numberOfPages: Math.ceil(filteredData.length / PAGE_SIZE).toFixed(),
    numberOfResults: filteredData.length,
    filter: filter,
    filterVal:filterVal
  };
  res.send(paginatedData);
});

const applySearch = (tickets: any[], search: string, filter:string, filterVal:string) => {
  return (
      tickets.filter((ticket) =>
          filter ==='' || filterVal ===''? true:(filter === 'from' ?
              ticket.userEmail === filterVal :
              filter === 'after' ?
                  new Date(filterVal) <= new Date(ticket.creationTime)
                  : filter === 'before' ?
                  new Date(filterVal) >= new Date(ticket.creationTime)
                  :true)).filter((ticket)=> search !== '' ? buildStr(ticket).includes(search) : true)

  );
}

function buildStr(ticket: any): string {
 return ticket.title.toLowerCase() + ticket.content.toLowerCase();
}

const generateId = (pre: string) => {
  return `${pre}_${new Date().getTime()}`;
}
app.post(APIPath, (req, res) => {
  const ticket = req.body as Ticket;
  const newLabels = ticket.labels?.map((label)=>label)
  const t = {
    id: generateId(ticket.id),
    title: ticket.title,
    content: ticket.content,
    creationTime: new Date().getTime().valueOf(),
    userEmail: ticket.userEmail,
    labels: newLabels
  }
  tempData.unshift(t)
  res.send(t);
})

app.listen(serverAPIPort);
console.log('server running', serverAPIPort)

