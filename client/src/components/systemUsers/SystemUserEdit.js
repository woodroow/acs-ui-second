import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, Button, Form, FormInput, FormGroup, FormCheckbox
} from 'shards-react';

import '../../assets/modal.css';

class SystemUserEdit extends React.Component<Props> {
  state = {
    newpassword: '',
    user: null,
    id: null,
    wasChanged: false,
    removeModalIsOpen: false,
    passwordWasChanged: false,
    changePasswordModalIsOpen: false
  };

  async componentDidMount() {
    const { user } = this.props;
    this.setState({ user, id: user.email });
  }

  handleChangeUser = name => event => {
    const { value } = event.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user, wasChanged: true });
  };

  handleChangePassword = event => {
    const { value } = event.target;
    this.setState({ newpassword: value, passwordWasChanged: true });
  };

  handleRemoveuserOpen = () => {
    const { removeModalIsOpen } = this.state;
    this.setState({ removeModalIsOpen: !removeModalIsOpen });
  }


  handleResetPasswordOpen = () => {
    const { changePasswordModalIsOpen } = this.state;
    this.setState({ changePasswordModalIsOpen: !changePasswordModalIsOpen });
  }

  handleRemoveUser = async () => {
    const { id } = this.state;
    const { onCloseRemove } = this.props;
    await fetch(`/api/system_users/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    onCloseRemove();
  };


  handleResetPassword = async () => {
    const { id, newpassword } = this.state;
    await fetch(`/api/system_users/password/${id}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: newpassword
      })
    });
    this.setState({ changePasswordModalIsOpen: false });
  };

  handleSaveUser = async () => {
    const { user, id } = this.state;
    const { onClose } = this.props;
    await fetch(`/api/system_users/${id}`, {
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


  handleChangeRule = () => {
    const { user } = this.state;
    user.admin = !user.admin;
    this.setState({
      user, wasChanged: true
    });
  }

  render() {
    const { onClose } = this.props;
    const {
      user, wasChanged, removeModalIsOpen, newpassword, changePasswordModalIsOpen, passwordWasChanged
    } = this.state;
    const {
      handleChangeUser, handleSaveUser, handleRemoveUser, handleChangeRule,
      handleChangePassword, handleResetPasswordOpen, handleResetPassword
    } = this;
    return (
      user
        && (<>
          <Modal open={!removeModalIsOpen && !changePasswordModalIsOpen} toggle={onClose}>
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
              <Button className='mt-5' onClick={handleResetPasswordOpen} block theme='danger'>Сбросить пароль</Button>
             
              
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
          </Modal>
          <Modal open={changePasswordModalIsOpen} toggle={this.handleResetPasswordOpen}>
            <ModalBody>
              <FormGroup>
                <label htmlFor='#newpassword'>Новый пароль</label>
                <FormInput
                  id='#newpassword'
                  value={newpassword}
                  onChange={handleChangePassword}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleResetPasswordOpen} theme='light'>Отмена</Button>
              <Button disabled={!passwordWasChanged} onClick={handleResetPassword} theme='danger'>Изменить</Button>
            </ModalFooter>
          </Modal></>)
      
    );
  }
}
SystemUserEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCloseRemove: PropTypes.func.isRequired
};
export default SystemUserEdit;
