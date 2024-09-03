import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function UserDropdown({ userDisplayName }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          textTransform: "none", // Prevents uppercase transformation
          color: "black", // Sets the color to black
        }}
      >
        <CgProfile size={30} className="text-[#000] mr-1" /> {userDisplayName}
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "200px", // Adjust the width as needed
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/customer/account/">Dashboard</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/customer/profile">Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/customer/settings">Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={"/logout/"}>Logout</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserDropdown;
