import React from 'react';
import {
  Container, Row, Col, Card, CardHeader, CardBody, Button, Modal, ModalBody, ModalHeader
} from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import Grid from '../components/common/Grid';
import UserEdit from '../components/users/UserEdit';

class Users extends React.Component<Props> {
  state = {
    rows: [],
    columns: [],
    limit: 5,
    page: 0,
    count: 0,
    modalIsOpen: false,
    currentUser: null
  };

  async componentDidMount() {
    this.loadData();
  }

  changeCurrentPage = async page => {
    await this.setState({ page });
    await this.loadData();
  };

  openUser = async id => {
    this.setState({ modalIsOpen: true, currentUser: id });
  };

  closeUser = async () => {
    this.setState({ modalIsOpen: false });
    await this.loadData();
  };

  async loadData() {
    const { limit, page } = this.state;
    const result = await fetch(
      `/api/users?limit=${limit}&skip=${page * limit}`,
      {
        method: 'GET'
      },
    );
    const { data, count } = await result.json();
    if (!data || !data.length) throw new Error('Failed to load the news feed.');
    const columns = [
      { name: 'TABNUM', title: '#' },
      { name: 'LNAME', title: 'Фамилия' },
      { name: 'FNAME', title: 'Имя' },
      { name: 'SNAME', title: 'Отчество' },
      { name: 'EMAIL', title: 'Email' },
      { name: 'NAME', title: 'Подразделение' }
    ];
    const rows = data.map(item => {
      const object = {
        id: item.ID,
        actions: (
          <Button onClick={() => this.openUser(item.ID)} size='sm'>
            изменить
          </Button>
        )
      };
      columns.map(col => {
        object[col.name] = item[col.name];
        return true;
      });
      return object;
    });
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
      currentUser
    } = this.state;
    return (
      <>
        <Container fluid className='main-content-container px-4'>
          {/* Page Header */}
          <Row noGutters className='page-header py-4'>
            <PageTitle sm='4' subtitle='Пользователи' className='text-sm-left' />
          </Row>
  
          {/* Default Light Table */}
          <Row>
            <Col>
              <Card small className='mb-4'>
                <CardHeader className='border-bottom'>
                  <h6 className='m-0'>
                    <Button theme='success'>
                      <i className='material-icons'>add</i>
                      {' Добавить'}
                    </Button>
                  </h6>
                </CardHeader>
                <CardBody className='p-0 pb-3'>
              
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
        {modalIsOpen && (<UserEdit onClose={this.closeUser} user={currentUser} />)}
      </>
    );
  }
}
export default Users;
