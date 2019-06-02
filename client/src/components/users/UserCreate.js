import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, Button, Form, FormInput, FormGroup, FormSelect, Alert
} from 'shards-react';

import '../../assets/modal.css';

class UserCreate extends React.Component<Props> {
  state = {
    isFetching: true,
    user: {},
    wasChanged: false,
    departments: [],
    positions: [],
    keys: [],
    removeModalIsOpen: false,
    error: false
  };

  async componentDidMount() {
    await this.loadDepartments();
    await this.loadPositions();
    await this.loadKeys();
    // await this.loadUser(user);
    this.setState({ isFetching: false });
  }

  handleChangeUser = name => event => {
    const { value } = event.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user, wasChanged: true });
  };

  handleCreateUser = async () => {
    const { user } = this.state;
    const { onClose } = this.props;
    const result = await fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user
      })
    });

    if (!result || result.status !== 200) {
      return this.setState({ error: true });
    }
    onClose();
    return true;
  };

  async loadUser(id) {
    const result = await fetch(`/api/users/${id}`, {
      method: 'GET'
    });
    const data = await result.json();
    if (!data) throw new Error('Failed to load data.');
    this.setState({ user: data });
  }

  async loadDepartments() {
    const result = await fetch('/api/departments', {
      method: 'GET'
    });
    const data = await result.json();
    if (!data) throw new Error('Failed to load data.');
    const { user } = this.state;
    user.PODR = data[0].ID;
    this.setState({ departments: data, user });
  }

  async loadPositions() {
    const result = await fetch('/api/positions', {
      method: 'GET'
    });
    const data = await result.json();
    if (!data) throw new Error('Failed to load data.');
    const { user } = this.state;
    user.DOLZ = data[0].ID;
    this.setState({ positions: data, user });
  }

  async loadKeys() {
    const result = await fetch('/api/keys', {
      method: 'GET'
    });
    const data = await result.json();
    const { user } = this.state;
    user.KEY = data[0].ID;
    if (!data) throw new Error('Failed to load data.');
    this.setState({ keys: data });
  }

  render() {
    const { onClose } = this.props;
    const {
      user, wasChanged, departments, positions, isFetching, removeModalIsOpen, error, keys
    } = this.state;
    const { handleChangeUser, handleCreateUser } = this;
    return (
      !isFetching
        && (<>
          <Modal open={!removeModalIsOpen} toggle={onClose}>
            <ModalBody>
              <Form>
                <FormGroup>
                  <label htmlFor='#LNAME'>Фамилия</label>
                  <FormInput
                    id='#LNAME'
                    value={user.LNAME}
                    onChange={handleChangeUser('LNAME')}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor='#FNAME'>Имя</label>
                  <FormInput
                    id='#FNAME'
                    value={user.FNAME}
                    onChange={handleChangeUser('FNAME')}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor='#SNAME'>Отчество</label>
                  <FormInput
                    id='#SNAME'
                    value={user.SNAME}
                    onChange={handleChangeUser('SNAME')}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor='#LNAME'>Телефон</label>
                  <FormInput
                    id='#PHONE'
                    value={user.PHONE}
                    onChange={handleChangeUser('PHONE')}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor='#EMAIL'>Почта</label>
                  <FormInput
                    id='#EMAIL'
                    value={user.EMAIL}
                    onChange={handleChangeUser('EMAIL')}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor='#dolz'>Должность</label>
                  <FormSelect id='dolz' value={user.DOLZ} onChange={handleChangeUser('DOLZ')}>
                    {positions.map(item => (
                      <option key={item.ID} value={item.ID}>{item.NAME}</option>
                    ))}
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <label htmlFor='#department'>Подразделение</label>
                  <FormSelect id='department' value={user.PODR} onChange={handleChangeUser('PODR')}>
                    {departments.map(item => (
                      <option key={item.ID} value={item.ID}>{item.NAME}</option>
                    ))}
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <label htmlFor='#key'>Пропуск</label>
                  <FormSelect id='key' value={user.KEY} onChange={handleChangeUser('KEY')}>
                    {keys.map(item => (
                      <option key={item.ID} value={item.ID}>{item.ID}</option>
                    ))}
                  </FormSelect>
                </FormGroup>
              </Form>

              <Alert open={error} theme='danger'>
                    Ошибка! Заполните все поля и повторите попытку
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} theme='light'>Закрыть</Button>
              <Button disabled={!wasChanged} onClick={handleCreateUser}>Создать</Button>
            </ModalFooter>
          </Modal>
          </>)
      
    );
  }
}
UserCreate.propTypes = {
  onClose: PropTypes.func.isRequired
};
export default UserCreate;
