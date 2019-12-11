import React, { Component, useState } from "react";
import { LayoutAdmin } from "../../layouts";
import { BreadCrums } from "../../components";
import {
  Grid,
  IconButton,
  Typography,
  Paper,
  TextField
} from "@material-ui/core";
import { Label, Edit, Delete, Clear, Check } from "@material-ui/icons";
import { connect } from "react-redux";

const data = [
  { value: "hello", label: "Xin chao" },
  { value: "hi", label: "Xin chao than mat" },
  { value: "good", label: "Tot" },
  { value: "bad", label: "Xau" }
];

function TagItem({ data }) {
  const [isOnEdit, setisOnEdit] = useState(false);

  return (
    <Paper className="df jsb ac p1">
      <div className="df ac">
        <Label color="inherit" className="mr1" />
        {isOnEdit ? (
          <TextField value={data.label} />
        ) : (
          <Typography>{data.label}</Typography>
        )}
      </div>
      {isOnEdit ? (
        <div className="df ac">
          <IconButton>
            <Check />
          </IconButton>
          <IconButton>
            <Clear onClick={() => setisOnEdit(false)} />
          </IconButton>
        </div>
      ) : (
        <div className="df ac">
          <IconButton onClick={() => setisOnEdit(true)}>
            <Edit />
          </IconButton>
          <IconButton>
            <Delete color="secondary" />
          </IconButton>
        </div>
      )}
    </Paper>
  );
}

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTagValue: ""
    };
  }

  render() {
    const { newTagValue } = this.state;

    return (
      <LayoutAdmin>
        <BreadCrums navs={[{ text: "Tag kỹ năng" }]} />

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className="df jsb ac p1">
              <div className="df ac f1">
                <Label color="inherit" className="mr1" />
                <TextField
                  fullWidth
                  placeholder="Nhập tên tag mới..."
                  onChange={event =>
                    this.setState({ newTagValue: event.target.value })
                  }
                  value={newTagValue}
                />
              </div>
              <IconButton>
                <Check />
              </IconButton>
            </div>
          </Grid>

          {data.map((tag, index) => (
            <Grid item xs={4} key={index}>
              <TagItem data={tag} />
            </Grid>
          ))}
        </Grid>
      </LayoutAdmin>
    );
  }
}

export default connect(
  ({ admin }) => ({
    isLoadingTags: admin.tags.isOk,
    tags: admin.tags.tags
  }),
  {}
)(Tags);
