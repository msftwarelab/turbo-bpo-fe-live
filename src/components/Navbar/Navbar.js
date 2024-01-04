import React from 'react';
import { Navbar as BsNavbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BrandModal from 'components/BrandModal';
import { func } from 'prop-types';

const Navbar = ({ onClickSidebar }) => {
  return (
    <BsNavbar bg="primary" variant="dark">
      <Button onClick={onClickSidebar} className="mr-2" active>
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <BrandModal />
    </BsNavbar>
  );
};

Navbar.propTypes = {
  onClickSidebar: func,
};

Navbar.defaultProps = {
  onClickSidebar: e => e,
};

export default Navbar;
