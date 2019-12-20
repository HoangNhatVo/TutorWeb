import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItemText,
  ListItemIcon,
  Typography,
  ListItem,
  List,
  AppBar,
  Toolbar,
  Drawer
} from "@material-ui/core";
import {
  StarBorder,
  PersonOutlineOutlined,
  GroupOutlined,
  Assignment
} from "@material-ui/icons";
import HeaderUserProfile from "../components/HeaderUserProfile";
import history from "../utils/history";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.appBar - 1
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 60
  },
  toolbar: theme.mixins.toolbar
}));

export default function LayoutAdmin(props) {
  const classes = useStyles();
  const toHome = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <img
            onClick={toHome}
            src="/logo.svg"
            style={{ width: 32, height: 32, cursor: "pointer" }}
            alt="logo"
          />
          <Typography
            onClick={toHome}
            variant="h6"
            className="f1"
            style={{ cursor: "pointer" }}
          >
            XTutor
          </Typography>

          <HeaderUserProfile />
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {[
            {
              icon: <PersonOutlineOutlined color="inherit" />,
              to: "/admin/moderators",
              text: "Thành viên"
            },
            {
              icon: <GroupOutlined color="inherit" />,
              to: "/admin/users",
              text: "Người dùng"
            },
            {
              icon: <StarBorder color="inherit" />,
              to: "/admin/tags",
              text: "Tag kỹ năng"
            },
            {
              icon: <Assignment color="inherit" />,
              to: "/admin/contracts",
              text: "Hợp đồng"
            }
          ].map(tab => (
            <ListItem
              style={
                window.location.pathname.slice(0, tab.to.length) === tab.to
                  ? {
                      backgroundColor: "gray",
                      color: "white"
                    }
                  : {
                      backgroundColor: "white",
                      color: "gray"
                    }
              }
              button
              key={tab.text}
              onClick={() => history.push(tab.to)}
            >
              <ListItemIcon style={{ color: "inherit" }}>
                {tab.icon}
              </ListItemIcon>
              <ListItemText primary={tab.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}
