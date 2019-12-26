import React, { Component } from "react";
import { HeaderOut, Footer, Menu, Banner, TeacherCard } from "../components";
import {
  Container,
  Typography,
  Link,
  Grid,
  MenuItem,
  TextField,
  Button,
  IconButton
} from "@material-ui/core";
import { getTeachers, getTags } from "../actions";
import { connect } from "react-redux";
import { color } from "../utils";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

function ItemHot({ src, body1, body2 }) {
  return (
    <Grid item xs={3}>
      <div className="df fdc aic">
        <img
          src={src}
          alt=""
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            backgroundColor: "transparent"
          }}
        />
        <Typography
          variant="body1"
          gutterBottom
          color="textPrimary"
          className="mt1"
        >
          {body1}
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          {body2}
        </Typography>
      </div>
    </Grid>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myLocation: "",
      myWave: "",
      page: 1,
      myTag: "",
      isCheckOn: false
    };
  }

  componentDidMount() {
    if (this.props.teachers && !this.props.teachers.isOk)
      this.props.getTeachers();
    if (!this.props.isTagsGotten) this.props.getTags();
  }
  changeState = field => event => {
    this.setState({ [field]: event.target.value });
  };
  render() {
    const { teachers, tags } = this.props;
    const { myLocation, myWave, myTag, isCheckOn, page } = this.state;
    const { isLoading } = teachers;

    return (
      <div className="df fdc" style={{ minHeight: "100vh" }}>
        <HeaderOut hasNoAccount hasAccount />
        <Menu />
        <Banner />

        <Container maxWidth="lg" className="df fdc f1">
          <Typography
            variant="h5"
            className="mt2 mb2"
            align="center"
            component="h5"
            style={{ fontWeight: 600 }}
          >
            Gia sư đáng tin cậy
          </Typography>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Đia điểm"
                helperText={isCheckOn && !myLocation && "Không được để trống"}
                error={isCheckOn && !myLocation}
                variant="outlined"
                value={myLocation}
                onChange={this.changeState("myLocation")}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Tiền dạy"
                helperText={isCheckOn && isNaN(myWave) && "Phải là số."}
                error={isCheckOn && isNaN(myWave)}
                variant="outlined"
                value={myWave}
                type="number"
                onChange={this.changeState("myWave")}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Tag"
                variant="outlined"
                helperText={isCheckOn && !myTag && "Không được để trống"}
                error={isCheckOn && !myTag}
                value={myTag}
                select
                fullWidth
                onChange={this.changeState("myTag")}
              >
                {tags.map(option => (
                  <MenuItem key={option.tentag} value={option.tentag}>
                    {option.tentag}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={3}>
              <Button
                fullWidth
                style={{ padding: 16 }}
                className="mb1"
                variant="contained"
                color="primary"
                disabled={isLoading}
                onClick={() => {
                  if (isNaN(myWave)) return;
                  this.props.getTeachers(myLocation, myWave, myTag);
                }}
              >
                Truy vấn
              </Button>
            </Grid>
          </Grid>
          {isLoading ? (
            <div>Đang tải...</div>
          ) : (
            <Grid container justify="center" spacing={2}>
              {teachers.teachers
                .slice((page - 1) * 10, (page + 1) * 10)
                .map((teacher, index) => (
                  <Grid key={index} item xs={3}>
                    <TeacherCard data={teacher} />
                  </Grid>
                ))}
            </Grid>
          )}
        </Container>

        <div className="df aic jcc mt1 p1">
          <IconButton
            disabled={page === 1}
            onClick={() =>
              this.setState(prevState => ({ page: prevState.page - 1 }))
            }
            className="mr1"
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            disabled={
              page * 10 >= (teachers.teachers && teachers.teachers.length)
            }
            onClick={() =>
              this.setState(prevState => ({ page: prevState.page + 1 }))
            }
            className="ml1"
          >
            <ChevronRight />
          </IconButton>
        </div>

        <div
          style={{
            backgroundColor: color.main,
            textAlign: "center"
          }}
          className="df fdc aic p1 mt2"
        >
          <Typography
            variant="h5"
            className="mt2"
            align="center"
            component="h5"
            gutterBottom
            style={{ fontWeight: 600, color: "white" }}
          >
            Nguồn lực
          </Typography>
          <Typography component="span" style={{ color: "white" }}>
            Đội ngũ giáo viên được tuyển chọn khắp cả nước. Tìm hiểu về chính
            sách của chúng tôi.
          </Typography>
          <Link
            href="#3"
            className="mt1 mb1"
            style={{
              border: "1px solid white",
              color: "#fff",
              padding: "1rem"
            }}
            onClick={e => e.preventDefault()}
          >
            Tìm hiểu thêm
          </Link>
        </div>

        <Container maxWidth="lg" className="df fdc mt2">
          <Typography
            variant="h5"
            className="mt2 mb2"
            align="center"
            component="h5"
            style={{ fontWeight: 600 }}
          >
            Điểm nổi bật
          </Typography>

          <Grid container spacing={3}>
            <ItemHot
              src="/images/browser.svg"
              body1="Tương tác nhanh"
              body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
            />
            <ItemHot
              src="/images/browser.svg"
              body1="Tương tác nhanh"
              body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
            />
            <ItemHot
              src="/images/browser.svg"
              body1="Tương tác nhanh"
              body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
            />
            <ItemHot
              src="/images/browser.svg"
              body1="Tương tác nhanh"
              body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
            />
          </Grid>
        </Container>

        <Container maxWidth="lg" className="df fdc mt2 mb2">
          <Typography
            variant="h5"
            className="mt2 mb2"
            align="center"
            component="h5"
            style={{ fontWeight: 600 }}
          >
            Cách thức hoạt động
          </Typography>

          <Grid container spacing={3}>
            <ItemHot
              src="/images/postjob.jpg"
              body1="Tương tác nhanh"
              body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
            />
            <ItemHot
              src="/images/chat.png"
              body1="Tương tác nhanh"
              body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
            />
            <ItemHot
              src="/images/find.png"
              body1="Tương tác nhanh"
              body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
            />
            <ItemHot
              src="/images/pay.png"
              body1="Tương tác nhanh"
              body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
            />
          </Grid>
        </Container>

        <Footer />
      </div>
    );
  }
}

export default connect(
  ({ teacher, admin }) => ({
    teachers: teacher.teachers,
    tags: admin.tags.tags,
    isTagsGotten: admin.tags.isOk
  }),
  {
    getTeachers,
    getTags
  }
)(Home);
