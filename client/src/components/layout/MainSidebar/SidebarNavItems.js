import React from 'react';
import { Nav } from 'shards-react';
import { getSession } from '../../../auth';

import SidebarNavItem from './SidebarNavItem';
import { Store } from '../../../flux';

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: Store.getSidebarItems()
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems } = this.state;
    const session = getSession();
    let items = navItems;
    if (!session || !session.admin) {
      items = navItems.filter(item => !item.admin);
    }
    return (
      <div className='nav-wrapper'>
        <Nav className='nav--no-borders flex-column'>
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    );
  }
}

export default SidebarNavItems;
