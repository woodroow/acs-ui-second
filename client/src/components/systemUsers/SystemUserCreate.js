import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, Button, Form, FormInput, FormGroup, FormCheckbox, Alert
} from 'shards-react';

import '../../assets/modal.css';

class SystemUserCreate extends React.Component<Props> {
  state = {
    user: { email: '', admin: false, password: '' },
    wasChanged: false,
    removeModalIsOpen: false,
    error: false
  };

  handleChangeUser = name => event => {
    const { value } = event.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user, wasChanged: true });
  };

  handleChangeRule = () => {
    const { user } = this.state;
    user.admin = !user.admin;
    this.setState({
      user, wasChanged: true
    });
  }

  handleCreateUser = async () => {
    const { user } = this.state;
    const { onClose } = this.props;
    const result = await fetch('/api/system_users', {
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

  render() {
    const { onClose } = this.props;
    const {
      user, wasChanged, removeModalIsOpen, error
    } = this.state;
    const { handleChangeUser, handleCreateUser, handleChangeRule } = this;
    return (
      <Modal open={!removeModalIsOpen} toggle={onClose}>
        <ModalBody>
          <Form>
            <FormGroup>
              <label htmlFor='#email'>Логин</label>
              <FormInput
                id='#email'
                value={user.email}
                onChange={handleChangeUser('email')}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor='#password'>Пароль</label>
              <FormInput
                id='#password'
                value={user.password}
                onChange={handleChangeUser('password')}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor='#rule'>Права</label>
              <FormCheckbox
                id='rule'
                toggle
                onChange={handleChangeRule}
                checked={user.admin}
              >
                  Администратор
              </FormCheckbox>
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
      
    );
  }
}
SystemUserCreate.propTypes = {
  onClose: PropTypes.func.isRequired
};
export default SystemUserCreate;
