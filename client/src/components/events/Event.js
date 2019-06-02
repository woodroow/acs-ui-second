import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalBody, ModalFooter, Button, ModalHeader, ListGroup, ListGroupItem
} from 'shards-react';
import moment from 'moment';

import '../../assets/modal.css';

class Event extends React.PureComponent<Props> {
  render() {
    const { onClose, event, getEvent } = this.props;
    return (
      <Modal open toggle={onClose}>
        <ModalHeader>Информация о событии</ModalHeader>
        <ModalBody>
          <ListGroup>
            <ListGroupItem>
              ФИО:
              {' '}
              {event.FIO}
            </ListGroupItem>
            <ListGroupItem>
              Тип события:
              {' '}
              {getEvent(event.EVN)}
            </ListGroupItem>
            <ListGroupItem>
              Время:
              {' '}
              {moment(event.DT).format('DD/MM/YY HH:mm')}
            </ListGroupItem>
            <ListGroupItem>
              Место:
              {' '}
              {event.NAME}
            </ListGroupItem>
            <ListGroupItem>
              Пропуск:
              {' '}
              {event.EKEY}
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
export default Event;
