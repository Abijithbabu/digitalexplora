import React from "react";
import Avatar from "@material-ui/core/Avatar";

function AvatarMenu({ children, name, img, handleToggle }) {
  return (
    <div className="cursor-pointer">
      <Avatar
        className="menuOption__icon ml-auto"
        title={name}
        src={img}
        aria-controls="avatar-menu"
        aria-haspopup="true"
        onClick={handleToggle}
      />
      {children}
    </div>
  );
}

export default AvatarMenu;
