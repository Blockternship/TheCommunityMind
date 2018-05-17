/**
 * Created by will on 16/05/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../../generic/MenuItem/MenuItem';

//TODO change onClick to real function
const ViewProfile = ({userId}) =>
  <MenuItem title="View Profile" onClick={() => console.log("View profile")}/>;

ViewProfile.propTypes = {
  userId: PropTypes.string.isRequired
};

export default ViewProfile;