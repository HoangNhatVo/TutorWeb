import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import Avatar from 'react-avatar-edit';
import { Container, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import './style/teacher-home.css'
class TeacherHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
      src: ''
    };
  }
  onCrop = preview => {
    this.setState({ preview });
  };
  onClose = () => {
    this.setState({ preview: null });
  };
  render() {
    return (
      <LayoutUser>
        <Typography variant="h4" className="mt2" align="center" component="h4">
          Your profile
        </Typography>
        <Container maxWidth="lg" className="df fc f1" style={{ backgroundColor: '#fff', margin: '50px 0' }}>
          <div>
            <div className='form-item'>
              <div className='label'>
                <h3>Tell us more about you</h3>
                <p>Please upload a professional portrait that clearly shows your face</p>
              </div>
              <div style={{ display: 'flex' }}>
                <Avatar
                  width={200}
                  height={200}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                  src={this.state.src}
                />
                <img
                  src={this.state.preview}
                  alt="Avatar"
                  style={{
                    marginLeft: 75,
                    border: '1px dashed #000',
                    borderRadius: 5,
                    width: 195
                  }}
                />
              </div>
            </div>
            <div className='form-item'>
              <div className='item'>
                <div className='label'>
                  <h3>First name </h3>
                </div>
                <input />
              </div>
              <div className='item'>
                <div className='label'>
                  <h3>Last name</h3>
                </div>
                <input />
              </div>
              <div className='item'>
                <div className='label'>
                  <h3>Address</h3>
                </div>
                <input />
              </div>
              <div className='item'>
                <div className='label'>
                  <h3>Add a professional title </h3>
                  <p>Try to choose a title that will help you stand out.</p>
                </div>
                <input placeholder='EXAMPLE: Desktop C# Developer' />
              </div>
              <div className='item'>
                <div className='label'>
                  <h3>Write a professional overview</h3>
                  <p>Highlight your top skills, experience, and interests. This is one of the first things clients will see on your profile.</p>
                </div>
                <textarea style={{ width: 800, height: 300 }}></textarea>
              </div>
            </div>
          </div>
          <div className='btn-submit'>
          <Button variant="contained" color="secondary">
            Save
          </Button>
          </div>
        </Container>
      </LayoutUser>
    );
  }
}
export default TeacherHome;
