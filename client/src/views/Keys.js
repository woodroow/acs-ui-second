import React from 'react';
import {
  Container, Row, Col, Card, CardHeader, CardBody, Button
} from 'shards-react';
import moment from 'moment';

import PageTitle from '../components/common/PageTitle';
import Grid from '../components/common/Grid';
import KeyCreate from '../components/keys/KeyCreate';

class Keys extends React.Component<Props> {
  state = {
    rows: [],
    columns: [],
    limit: 5,
    page: 0,
    count: 0,
    modalCreateIsOpen: false
  };

  async componentDidMount() {
    this.loadData();
  }

  changeCurrentPage = async page => {
    await this.setState({ page });
    await this.loadData();
  };

  createUser = () => {
    this.setState({ modalCreateIsOpen: true });
  };

  closeCreateUser = async () => {
    this.setState({ modalCreateIsOpen: false });
    await this.loadData();
  };

  async loadData() {
    const { limit, page } = this.state;
    const result = await fetch(
      `/api/keys/list?limit=${limit}&skip=${page * limit}`,
      {
        method: 'GET'
      },
    );
    const { data, count } = await result.json();
    if (!data || !data.length) throw new Error('Failed to load the news feed.');
    const columns = [
      { name: 'ID', title: 'Номер пропуска' }
    ];
    const rows = data.map(item => {
      const object = {
        id: item.ID,
        date: moment(item.GDATE).format('DD/MM HH:mm')
      };
      columns.map(col => {
        object[col.name] = item[col.name];
        return true;
      });
      return object;
    });
    columns.push({ name: 'date', title: 'Создан' });
    this.setState({ rows, columns, count });
  }

  render() {
    const {
      columns,
      rows,
      limit,
      page,
      count,
      modalCreateIsOpen
    } = this.state;
    return (
      <>
        <Container fluid className='main-content-container px-4'>
          {/* Page Header */}
          <Row noGutters className='page-header py-4'>
            <PageTitle sm='4' subtitle='Пропуски' className='text-sm-left' />
          </Row>
  
          {/* Default Light Table */}
          <Row>
            <Col>
              <Card small className='mb-4'>
                <CardHeader className='border-bottom'>
                  <h6 className='m-0'>
                    <Button theme='success' onClick={this.createUser}>
                      <i className='material-icons'>add</i>
                      {' Добавить'}
                    </Button>
                  </h6>
                </CardHeader>
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
        {modalCreateIsOpen && (<KeyCreate onClose={this.closeCreateUser} />)}
      </>
    );
  }
}
export default Keys;
