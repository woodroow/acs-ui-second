import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from 'shards-react';
import { getSession, logOut } from '../../../../auth';

const { email } = getSession() || { email: 'unknown user' };
export default withRouter(class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const { history } = this.props;
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className='text-nowrap px-3 mt-2'>
          <span className='d-none d-md-inline-block'>Настройки</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem
            onClick={() => {
              logOut();
              history.push('/');
            }}
            className='text-danger'
          >
            <i className='material-icons text-danger'>&#xE879;</i>
Выход
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
});
