import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import avatar from "./assets/images/avatar-1.jpg";

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [username, setusername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      //   const obj = JSON.parse(localStorage.getItem("authUser"));
      //   setusername(obj.displayName);
      // } else if (
      //   process.env.REACT_APP_DEFAULTAUTH === "fake" ||
      //   process.env.REACT_APP_DEFAULTAUTH === "jwt"
      // ) {
      //   const obj = JSON.parse(localStorage.getItem("authUser"));
      //   setusername(obj.firstName);
      // }
      const obj = JSON.parse(localStorage.getItem("authUser"));
   
      setusername(obj.firstName+" "+obj.lastName)
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <div className="row justify-content-end">
      <div className="col-3">
<Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block mt-4"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          
          <img
            className="rounded-circle header-profile-user w-25"
            src={avatar}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-2">{username}</span>
      <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/edit-profile">
          <i className="mdi mdi-pencil d-none d-xl-inline-block" />
         Edit Profile
          </DropdownItem>
  
        </DropdownMenu>
      </Dropdown>
      </div>
      </div>
    </React.Fragment>
  );
};


export default ProfileMenu;
