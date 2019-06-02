import React from 'react';
import {
  Container, Row, Col, Card, CardBody, Button, Badge
} from 'shards-react';
import moment from 'moment';

import PageTitle from '../components/common/PageTitle';
import Grid from '../components/common/Grid';
import SystemEvent from '../components/events/SystemEvent';

class SystemEvents extends React.Component<Props> {
  state = {
    rows: [],
    columns: [],
    limit: 5,
    page: 0,
    count: 0,
    modalIsOpen: false,
    current: {}
  };

  async componentDidMount() {
    this.loadData();
  }

  changeCurrentPage = async page => {
    await this.setState({ page });
    await this.loadData();
  };

  openEvent = async event => {
    this.setState({ modalIsOpen: true, current: event });
  };

  closeHandler = async () => {
    this.setState({ modalIsOpen: false });
  };

  getEvent = id => {
    switch (id) {
      case 2:
        return (<Badge>Вход</Badge>);
      case 4:
        return (<Badge theme='success'>Выход</Badge>);
      default:
        return (
          <Badge theme='secondary'>
            Действие
            {' '}
            {id}
          </Badge>
        );
    }
  };

  async loadData() {
    const { limit, page } = this.state;
    const result = await fetch(
      `/api/system_events?limit=${limit}&skip=${page * limit}`,
      {
        method: 'GET'
      },
    );
    const { data, count } = await result.json();
    if (!data || !data.length) throw new Error('Failed to load.');
    const columns = [
      { name: 'FIO', title: 'Пользователь' },
      { name: 'EVNT', title: 'Описание' }
    ];
    const rows = data.map(item => {
      const object = {
        id: item.ID,
        date: moment(item.EV_T).format('DD/MM HH:mm'),
        actions: (
          <Button onClick={() => this.openEvent(item)} size='sm'>
            подробнее
          </Button>
        )
      };
      columns.map(col => {
        object[col.name] = item[col.name];
        return true;
      });
      return object;
    });
    columns.push({ name: 'date', title: 'Время' });
    columns.push({ name: 'actions', title: 'Действия', align: 'right' });
    this.setState({ rows, columns, count });
  }

  render() {
    const {
      columns,
      rows,
      limit,
      page,
      count,
      modalIsOpen,
      current
    } = this.state;
    return (
      <>
        <Container fluid className='main-content-container px-4'>
          <Row noGutters className='page-header py-4'>
            <PageTitle sm='4' subtitle='Системные события' className='text-sm-left' />
          </Row>
          <Row>
            <Col>
              <Card small className='mb-4'>
                <CardBody className='p-0'>
              
                  <Grid
                    rows={rows}
                    columns={columns}
                    limit={limit}
                    page={page}
                    count={count}
                    changeCurrentPage={this.changeCurrentPage}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {modalIsOpen && (<SystemEvent onClose={this.closeHandler} event={current} />)}
      </>
    );
  }
}
export default SystemEvents;
