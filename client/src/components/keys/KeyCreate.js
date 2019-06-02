import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, Button, Form, FormInput, FormGroup, Alert
} from 'shards-react';

import '../../assets/modal.css';

class KeyCreate extends React.Component<Props> {
  state = {
    item: { ID: '' },
    wasChanged: false,
    error: false
  };

  handleChange = name => event => {
    const { value } = event.target;
    const { item } = this.state;
    item[name] = value;
    this.setState({ item, wasChanged: true });
  };

  handleCreate = async () => {
    const { item } = this.state;
    const { onClose } = this.props;
    const result = await fetch('/api/keys', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item
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
      item, wasChanged, error
    } = this.state;
    const { handleChange, handleCreate } = this;
    return (
      <Modal open toggle={onClose}>
        <ModalBody>
          <Form>
            <FormGroup>
              <label htmlFor='#ID'>Введите номер пропуска</label>
              <FormInput
                id='#ID'
                value={item.ID}
                onChange={handleChange('ID')}
              />
            </FormGroup>
          </Form>

          <Alert open={error} theme='danger'>
                    Ошибка! Заполните все поля и повторите попытку
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} theme='light'>Закрыть</Button>
          <Button disabled={!wasChanged || !item.ID} onClick={handleCreate}>Создать</Button>
        </ModalFooter>
      </Modal>
      
    );
  }
}
KeyCreate.propTypes = {
  onClose: PropTypes.func.isRequired
};
export default KeyCreate;
