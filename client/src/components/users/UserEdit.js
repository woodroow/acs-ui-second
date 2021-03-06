import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, Button, Form, FormInput, FormGroup, FormSelect
} from 'shards-react';

import '../../assets/modal.css';

class UserEdit extends React.Component<Props> {
  state = {
    isFetching: true,
    user: {},
    wasChanged: false,
    departments: [],
    positions: [],
    keys: [],
    removeModalIsOpen: false
  };

  async componentDidMount() {
    const { user } = this.props;
    await this.loadDepartments();
    await this.loadPositions();
    await this.loadKeys();
    await this.loadUser(user);
    this.setState({ isFetching: false });
  }

  handleChangeUser = name => event => {
    const { value } = event.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user, wasChanged: true });
  };

  handleRemoveuserOpen = () => {
    const { removeModalIsOpen } = this.state;
    this.setState({ removeModalIsOpen: !removeModalIsOpen });
  }


  handleRemoveUser = async () => {
    const { user } = this.state;
    const { onCloseRemove } = this.props;
    await fetch(`/api/users/${user.ID}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    onCloseRemove();
  };

  handleSaveUser = async () => {
    const { user } = this.state;
    const { onClose } = this.props;
    await fetch(`/api/users/${user.ID}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user
      })
    });
    onClose();
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
    this.setState({ departments: data });
  }

  async loadPositions() {
    const result = await fetch('/api/positions', {
      method: 'GET'
    });
    const data = await result.json();
    if (!data) throw new Error('Failed to load data.');
    this.setState({ positions: data });
  }

  async loadKeys() {
    const result = await fetch('/api/keys', {
      method: 'GET'
    });
    const data = await result.json();
    if (!data) throw new Error('Failed to load data.');
    this.setState({ keys: data });
  }

  render() {
    const { onClose } = this.props;
    const {
      user, wasChanged, departments, positions, isFetching, removeModalIsOpen, keys
    } = this.state;
    const { handleChangeUser, handleSaveUser, handleRemoveUser } = this;
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

              
            </ModalBody>
            <ModalFooter>
              <Button outline theme='danger' onClick={this.handleRemoveuserOpen}>Удалить пользователя</Button>
              <Button onClick={onClose} theme='light'>Закрыть</Button>
              <Button disabled={!wasChanged} onClick={handleSaveUser}>Сохранить</Button>
            </ModalFooter>
          </Modal>
          <Modal open={removeModalIsOpen} toggle={this.handleRemoveuserOpen}>
            <ModalBody>Вы действительно хотите удалить пользователя?</ModalBody>
            
            <ModalFooter>
              <Button onClick={this.handleRemoveuserOpen} theme='light'>Отмена</Button>
              <Button onClick={handleRemoveUser} theme='danger'>Удалить</Button>
            </ModalFooter>
          </Modal></>)
      
    );
  }
}
UserEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCloseRemove: PropTypes.func.isRequired
};
export default UserEdit;
