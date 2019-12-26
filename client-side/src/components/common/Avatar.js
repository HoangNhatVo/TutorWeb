import React from "react";
import MuiAvatar from "@material-ui/core/Avatar";

class Avatar extends React.Component {
  render() {
    const { name, src, ...rest } = this.props;

    return (
      <MuiAvatar src={src || "/logo.svg"} {...rest}>
        {name && name.slice(0, 2)}
      </MuiAvatar>
    );
  }
}
export default Avatar;
