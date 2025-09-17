import { Button, Menu, Fade, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { User } from "../models/user";
import { Logout, Person } from "@mui/icons-material";
import HistoryIcon from '@mui/icons-material/History';
import { useLogoutMutation } from "../../features/account/accountAPI";
import { Link } from "react-router-dom";
import Inventory from "@mui/icons-material/Inventory";

type Props = {
  user: User;
}

export default function UserMenu({user}: Props) {

    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <Button
          id="fade-button"
          onClick={handleClick}
        >
          {user.email}
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem>
            <ListItemIcon>
              <Person/>
            </ListItemIcon>
            <ListItemText>
              Profile
            </ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/orders">
            <ListItemIcon>
              <HistoryIcon/>
            </ListItemIcon>
            <ListItemText>
              Orders
            </ListItemText>
          </MenuItem>
          {user.roles.includes("Admin") &&
          <MenuItem component={Link} to="/inventory">
            <ListItemIcon>
              <Inventory/>
            </ListItemIcon>
            <ListItemText>
              Inventory
            </ListItemText>
          </MenuItem> }
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout/>
            </ListItemIcon>
            <ListItemText>
              Logout
            </ListItemText>
          </MenuItem>
        </Menu>
      </div>
  )
}