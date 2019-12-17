import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card
} from "@material-ui/core";
import "./style/TeacherCard.css";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

const avatarDefault =
  "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-1/p100x100/67735731_499113454230617_7180310859275567104_n.jpg?_nc_cat=106&_nc_ohc=wfZV2GtbX2AAQm8sVDklsINg5iUsow-WVWd6c0Gpi1Xpr0n149MUjItfA&_nc_ht=scontent.fsgn1-1.fna&oh=5c9b9f5223c8b7808fc4bc4afe1e7004&oe=5E8832C5";

export default function TeacherCard({ data }) {
  const classes = useStyles();
  const { avatar, hoten, tiendaymotgio, thanhpho, diachi } = data;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={avatar || avatarDefault}
          title="Contemplative Reptile"
        />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="h2">
              {hoten}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {tiendaymotgio}VND/h
            </Typography>
          </div>
          <Typography variant="h6" color="textSecondary" component="h4">
            IT Consultant, DBA, Developer and
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {diachi} - {thanhpho}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className="tag">
        <span>PHP</span>
        <span>Javascript</span>
        <span>SQL</span>
        <span>CSS</span>
      </div>
      <CardActions>
        <Button size="small" variant="outlined" color="primary">
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
}
