import React, { Component } from "react";
import { Link, Breadcrumbs, Typography } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";

class BreadCrums extends Component {
  preventDefault = e => e.preventDefault();

  render() {
    const { navs } = this.props;

    return (
      <div className="mb1">
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          {navs.map((nav, index) => {
            if (index === navs.length - 1)
              return (
                <Typography color="textPrimary" key={index}>
                  {nav.text}
                </Typography>
              );
            else
              return (
                <Link
                  key={index}
                  color="inherit"
                  href={nav.to}
                  onClick={this.preventDefault}
                >
                  {nav.text}
                </Link>
              );
          })}
        </Breadcrumbs>
      </div>
    );
  }
}
export default BreadCrums;
