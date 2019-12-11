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
  GroupOutlined
} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
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

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <img src="/logo.svg" style={{ width: 32, height: 32 }} alt="logo" />
          <Typography variant="h6" className="f1">
            XTutor
          </Typography>
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
            { icon: <PersonOutlineOutlined />, text: "Thành viên" },
            { icon: <GroupOutlined />, text: "Người dùng" },
            { icon: <StarBorder />, text: "Tag kỹ năng" }
          ].map(tab => (
            <ListItem button key={tab.text}>
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}
