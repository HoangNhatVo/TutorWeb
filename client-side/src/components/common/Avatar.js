import React from "react";
import MuiAvatar from "@material-ui/core/Avatar";

class Avatar extends React.Component {
  render() {
    const { name, src, ...rest } = this.props;

    return (
      <MuiAvatar
        src={
          src &&
          "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-1/p100x100/67735731_499113454230617_7180310859275567104_n.jpg?_nc_cat=106&_nc_ohc=wfZV2GtbX2AAQm8sVDklsINg5iUsow-WVWd6c0Gpi1Xpr0n149MUjItfA&_nc_ht=scontent.fsgn1-1.fna&oh=5c9b9f5223c8b7808fc4bc4afe1e7004&oe=5E8832C5"
        }
        {...rest}
      >
        {name && name.slice(0, 2)}
      </MuiAvatar>
    );
  }
}
export default Avatar;
