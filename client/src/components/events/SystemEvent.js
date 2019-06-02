import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, Button, ModalHeader, ListGroup, ListGroupItem
} from 'shards-react';
import moment from 'moment';

import '../../assets/modal.css';

class SystemEvent extends React.PureComponent<Props> {
  render() {
    const { onClose, event } = this.props;
    return (
      <Modal open toggle={onClose}>
        <ModalHeader>Информация о событии</ModalHeader>
        <ModalBody>
          <ListGroup>
            <ListGroupItem>
              Пользователь:
              {' '}
              {event.FIO}
            </ListGroupItem>
            <ListGroupItem>
              Описание:
              {' '}
              {event.EVNT}
            </ListGroupItem>
            <ListGroupItem>
              Время:
              {' '}
              {moment(event.DT).format('DD/MM/YY HH:mm')}
            </ListGroupItem>
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Закрыть</Button>
        </ModalFooter>
      </Modal>
          
      
    );
  }
}
Event.propTypes = {
  onClose: PropTypes.func.isRequired
};
export default SystemEvent;
