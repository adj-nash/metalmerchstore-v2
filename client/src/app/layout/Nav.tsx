import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/Store";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountAPI";

const leftLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Merchandise", path: "/merchandise" },
];

const rightLinks = [
  { name: "Login ", path: "/login" },
  { name: "Register", path: "/register" },
];

const navStyles = {
  color: "white",
  typography: "h6",
  ml: -2,
  "&.active": {
    color: "secondary.main",
  },
};

export default function Nav() {
  const { data: user} = useUserInfoQuery();
  const { isLoading } = useAppSelector((state) => state.ui);
  const { data: basket } = useFetchBasketQuery();

  const itemCount =
    basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <AppBar position="fixed" sx={{ mb: 4, py: 1}}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            component={NavLink}
            to={"/"}
            variant="h6"
            sx={{ textDecoration: "none", "&.active": "none", color: "red", fontSize: "40px"}}
         
                      >
            Metal Merch Store
          </Typography>
         
        </Box>

        <Box>
          <List  sx={{ display: "flex"}}>
            {leftLinks.map(({ name, path }) => (
              <ListItem component={NavLink} to={path} sx={navStyles}>
                {name}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            key="basket"
            component={NavLink}
            to="basket"
            aria-label="cart"
            sx={{
              typography: "h6",
            }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

            {user ? (<UserMenu user={user}/>) : 

<List sx={{ display: "flex" }}>
{rightLinks.map(({ name, path }) => (
  <ListItem component={NavLink} to={path} sx={navStyles}>
    {name}
  </ListItem>
))}
</List>
            
          }

        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="primary" />
        </Box>
      )}
    </AppBar>
  );
}
