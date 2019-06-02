import React from 'react';
import {
  Container, Row, Col, Card, CardHeader, CardBody, Button, Badge
} from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import Grid from '../components/common/Grid';
import SystemUserEdit from '../components/systemUsers/SystemUserEdit';
import SystemUserCreate from '../components/systemUsers/SystemUserCreate';

class SystemUsers extends React.Component<Props> {
  state = {
    rows: [],
    columns: [],
    limit: 5,
    page: 0,
    count: 0,
    modalIsOpen: false,
    modalCreateIsOpen: false,
    currentUser: null
  };

  async componentDidMount() {
    this.loadData();
  }

  changeCurrentPage = async page => {
    await this.setState({ page });
    await this.loadData();
  };

  open = async item => {
    this.setState({ modalIsOpen: true, currentUser: item });
  };

  createUser = () => {
    this.setState({ modalCreateIsOpen: true });
  };

  closeUser = async () => {
    this.setState({ modalIsOpen: false });
    await this.loadData();
  };

  closeRemoveUser = async () => {
    this.setState({ modalIsOpen: false, page: 0 });
    await this.loadData();
  };

  closeCreateUser = async () => {
    this.setState({ modalCreateIsOpen: false });
    await this.loadData();
  };

  async loadData() {
    const { limit, page } = this.state;
    const result = await fetch(
      `/api/system_users?limit=${limit}&skip=${page * limit}`,
      {
        method: 'GET'
      },
    );
    const { data, count } = await result.json();
    if (!data || !data.length) throw new Error('Failed to load the news feed.');
    const columns = [
      { name: 'email', title: 'Почта' }
    ];
    const rows = data.map(item => {
      const object = {
        id: item.ID,
        role: item.admin ? <Badge>Администратор</Badge> : <Badge theme='secondary'>Модератор</Badge>,
        actions: (
          <Button onClick={() => this.open(item)} size='sm'>
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
    columns.push({ name: 'role', title: 'Права' });
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
      modalCreateIsOpen,
      currentUser
    } = this.state;
    return (
      <>
        <Container fluid className='main-content-container px-4'>
          {/* Page Header */}
          <Row noGutters className='page-header py-4'>
            <PageTitle sm='4' subtitle='Системне пользователи' className='text-sm-left' />
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
        {modalIsOpen && (<SystemUserEdit onClose={this.closeUser} onCloseRemove={this.closeRemoveUser} user={currentUser} />)}
        {modalCreateIsOpen && (<SystemUserCreate onClose={this.closeCreateUser} />)}
      </>
    );
  }
}
export default SystemUsers;
