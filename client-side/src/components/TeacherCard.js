import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  Chip
} from "@material-ui/core";
import "./style/TeacherCard.css";
import history from "../utils/history";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

const tags = ["photoshop", "HMVC", "Helloworld", "LyDaiCuong"];

const avatarDefault =
  "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-1/p100x100/67735731_499113454230617_7180310859275567104_n.jpg?_nc_cat=106&_nc_ohc=wfZV2GtbX2AAQm8sVDklsINg5iUsow-WVWd6c0Gpi1Xpr0n149MUjItfA&_nc_ht=scontent.fsgn1-1.fna&oh=5c9b9f5223c8b7808fc4bc4afe1e7004&oe=5E8832C5";

function TeacherCard({ data }) {
  const classes = useStyles();
  const { id, avatar, hoten, tiendaymotgio, thanhpho, diachi } = data;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={hoten}
          height="140"
          image={avatar || avatarDefault}
          title={hoten}
        />
        <CardContent>
          <div className="df jcsb">
            <Typography
              gutterBottom
              variant="body1"
              style={{ fontWeight: 600 }}
              component="p"
            >
              {hoten}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              style={{ color: "green" }}
              component="p"
            >
              {tiendaymotgio}VND/h
            </Typography>
          </div>
          <Typography variant="body1" color="textSecondary" component="p">
            IT Consultant, DBA, Developer and
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {diachi} - {thanhpho}
          </Typography>
        </CardContent>
      </CardActionArea>

      <div
        className="p1 df jcsb"
        style={{ flexWrap: "wrap", height: 106, overflow: "hidden" }}
      >
        {tags.map(tag => (
          <Chip style={{ margin: ".25rem 0" }} label={tag} key={tag} />
        ))}
      </div>

      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={() => history.push(`profile/${id}`)}
          color="primary"
        >
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
}

export default TeacherCard;
