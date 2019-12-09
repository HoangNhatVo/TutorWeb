import React from 'react'
import Button from '@material-ui/core/Button';
import "./style/banner.css"

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <img
          style={{ width: '100%', height: 500 }}
          src="https://www.asktutorhelp.com/img/banner_1.jpg" alt="banner" />
        <div className="title">
          <h1 className="titleBanner">Hire freelancers.Make things happen.™</h1>
          <p className="contentbanner">Get matched to top talent in minutes through our global network of skilled freelancers and professional agencies.</p>
          <Button variant="contained" color="secondary">
            Get started
          </Button>
        </div>
      </div>
    )
  }
}
export default Banner