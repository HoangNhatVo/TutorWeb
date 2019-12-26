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
import { withSnackbar, useSnackbar } from "notistack";

function TagItem({ data, updateTag, deleteTag }) {
  const [isOnEdit, setisOnEdit] = useState(false);
  const [tagValue, settagValue] = useState(data.tentag);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Paper className="df jcsb aic p1">
      <div className="df aic">
        <Label color="inherit" className="mr1" />
        {isOnEdit ? (
          <TextField
            error={!tagValue}
            helperText={
              (data.updating && "Đang cập nhật") ||
              (!tagValue && "Không được để trống")
            }
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
            disabled={data.updating}
            onClick={() => {
              if (tagValue)
                updateTag(data.id, tagValue, {
                  suc: () => {
                    enqueueSnackbar("Cập nhật thành công", {
                      variant: "success"
                    });
                  },
                  err: mes => {
                    enqueueSnackbar(mes, {
                      variant: "error"
                    });
                  }
                });
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
                deleteTag(data.id, {
                  suc: () => {
                    enqueueSnackbar("Xóa tag thành công", {
                      variant: "success"
                    });
                  },
                  err: mes => {
                    enqueueSnackbar(mes, {
                      variant: "error"
                    });
                  }
                });
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
    const {
      tags,
      isLoadingTags,
      updateTag,
      deleteTag,
      addTag,
      enqueueSnackbar
    } = this.props;

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
                  helperText={this.props.isAdding && "Đang thêm..."}
                  placeholder="Nhập tên tag mới..."
                  onChange={event =>
                    this.setState({ newTagValue: event.target.value })
                  }
                  value={newTagValue}
                />
              </div>
              <IconButton
                disabled={this.props.isAdding || !newTagValue}
                onClick={() => {
                  if (newTagValue)
                    addTag(newTagValue, {
                      suc: () => {
                        enqueueSnackbar("Thêm tag thành công", {
                          variant: "success"
                        });
                      },
                      err: mes => {
                        enqueueSnackbar(mes, {
                          variant: "error"
                        });
                      }
                    });
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
    tags: typeof admin.tags.tags === "object" ? admin.tags.tags : [],
    isAdding: admin.tags.isAdding
  }),
  { updateTag, deleteTag, addTag }
)(withSnackbar(Tags));
