import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, Button, Form, FormInput, FormGroup, FormSelect
} from 'shards-react';

class UserEdit extends React.Component<Props> {
  state = {
    isFetching: true,
    user: {},
    wasChanged: false,
    departments: [],
    positions: []
  };

  async componentDidMount() {
    const { user } = this.props;
    await this.loadDepartments();
    await this.loadPositions();
    await this.loadUser(user);
    this.setState({ isFetching: false });
  }

  handleChangeUser = name => event => {
    const { value } = event.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user, wasChanged: true });
  };

  handleSaveUser = async () => {
    const { user } = this.state;
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
    this.props.onClose();
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

  render() {
    const { onClose } = this.props;
    const {
      user, wasChanged, departments, positions, isFetching
    } = this.state;
    const { handleChangeUser, handleSaveUser } = this;
    return (
      !isFetching && (
        <Modal open toggle={onClose}>
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
            </Form>

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} theme='light'>Закрыть</Button>
            <Button disabled={!wasChanged} onClick={handleSaveUser}>Сохранить</Button>
          </ModalFooter>
        </Modal>
      )
    );
  }
}
UserEdit.propTypes = {
  onClose: PropTypes.func.isRequired
};
export default UserEdit;
