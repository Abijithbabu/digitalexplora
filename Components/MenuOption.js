import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import ProfileIcon from "@mui/icons-material/Person";
import Link from "next/link";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    zIndex: 99999,
  },
})((props) => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    zIndex: 9999,
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function MenuOption({ title, Icon, avatar, active }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`menu__option ${active ? "active" : ""}`}>
      {Icon && (
        <div className="navIcon">
          <Icon />
        </div>
      )}
      {title && <h3 className="menuOption__title">{title}</h3>}
      {avatar && (
        <Avatar
          className="menuOption__icon ml-auto"
          title={avatar.name}
          src={avatar.img}
          aria-controls="avatar-menu"
          aria-haspopup="true"
          onClick={handleToggle}
        />
      )}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href="/user/profile">
          <p>
            <StyledMenuItem onClick={handleClose}>
              <ListItemIcon>
                <ProfileIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </StyledMenuItem>
          </p>
        </Link>
        <p>
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledMenuItem>
        </p>
      </StyledMenu>
    </div>
  );
}

export default MenuOption;
