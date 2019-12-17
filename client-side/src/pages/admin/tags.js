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
import { updateTag, deleteTag, addTag } from "../../actions";

function TagItem({ data, updateTag, deleteTag }) {
  const [isOnEdit, setisOnEdit] = useState(false);
  const [tagValue, settagValue] = useState(data.tentag);

  return (
    <Paper className="df jcsb aic p1">
      <div className="df aic">
        <Label color="inherit" className="mr1" />
        {isOnEdit ? (
          <TextField
            value={tagValue}
            onChange={event => settagValue(event.target.value)}
          />
        ) : (
          <Typography>{data.tentag}</Typography>
        )}
      </div>
      {isOnEdit ? (
        <div className="df aic">
          <IconButton
            onClick={() => {
              if (tagValue) updateTag(data.id, tagValue);
            }}
          >
            <Check />
          </IconButton>
          <IconButton onClick={() => setisOnEdit(false)}>
            <Clear />
          </IconButton>
        </div>
      ) : (
        <div className="df aic">
          <IconButton onClick={() => setisOnEdit(true)}>
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              if (window.confirm("Bạn muốn xóa tag kỹ năng này ?"))
                deleteTag(data.id);
            }}
          >
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
    const { tags, isLoadingTags, updateTag, deleteTag, addTag } = this.props;

    return (
      <LayoutAdmin>
        <BreadCrums navs={[{ text: "Tag kỹ năng" }]} />

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className="df jcsb aic p1">
              <div className="df aic f1">
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
              <IconButton
                onClick={() => {
                  if (newTagValue) addTag(newTagValue);
                }}
              >
                <Check />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={8} />

          {!isLoadingTags ? (
            <Grid item xs={4}>
              <div>Đang tải...</div>
            </Grid>
          ) : (
            <>
              {tags.map((tag, index) => (
                <Grid item xs={4} key={index}>
                  <TagItem data={tag} {...{ updateTag, deleteTag }} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </LayoutAdmin>
    );
  }
}

export default connect(
  ({ admin }) => ({
    isLoadingTags: admin.tags.isOk,
    tags: typeof admin.tags.tags === "object" ? admin.tags.tags : []
  }),
  { updateTag, deleteTag, addTag }
)(Tags);
