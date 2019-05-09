/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const Event = Model.define('Events', {
  EVNT: {
    type: DataType.STRING(255),
  },
  USR: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
});

export default Event;
