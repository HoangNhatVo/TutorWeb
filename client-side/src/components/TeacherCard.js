import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  Chip,
  Avatar
} from "@material-ui/core";
import "./style/TeacherCard.css";
import history from "../utils/history";
// import { getSpecialize } from "../utils";
// import { connect } from "react-redux";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

// const tags = ["photoshop", "HMVC", "Helloworld", "LyDaiCuong"];

const avatarDefault = "/logo.svg";

function TeacherCard({ data }) {
  const classes = useStyles();
  const { id, avatar, hoten, tiendaymotgio, thanhpho, diachi, tags } = data;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Avatar
          style={{
            width: 140,
            height: 140,
            display: "block",
            margin: "auto",
            boxShadow: "2px 2px 8px #00000040"
          }}
          src={avatar || avatarDefault}
          className="mt2 mb1"
          title={hoten}
          alt={hoten}
        />
        <CardContent>
          <Typography
            gutterBottom
            align="center"
            variant="h5"
            style={{ fontWeight: 600 }}
            component="p"
          >
            {hoten}
          </Typography>
          <Typography
            gutterBottom
            align="center"
            variant="body1"
            style={{ color: "green" }}
            component="p"
          >
            {tiendaymotgio}VND/h
          </Typography>
          {/* <Typography
            align="center"
            variant="body1"
            color="textSecondary"
            component="p"
          >
            {specializes && getSpecialize(specializes.specializes, chuyennganh)}
          </Typography> */}
          <Typography
            align="center"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {diachi} - {thanhpho}
          </Typography>
        </CardContent>
      </CardActionArea>

      <div
        className="p1 df jcc"
        style={{ flexWrap: "wrap", height: 106, overflow: "hidden" }}
      >
        {tags &&
          tags.map(tag => (
            <Chip
              style={{ margin: ".25rem 0" }}
              label={tag.NameTag}
              key={tag.IDTag}
            />
          ))}
      </div>

      <CardActions>
        <Button
          style={{ display: "block", margin: "auto" }}
          variant="outlined"
          onClick={() => history.push(`profile/${id}`)}
          color="primary"
          className="mb1"
        >
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
}

// export default connect(utils => ({ specializes: utils.specializes }))(
//   TeacherCard
// );
export default TeacherCard;
