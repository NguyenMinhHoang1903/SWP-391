import React, { Component } from 'react'
import './Content.css'

export default class Content extends Component {
  render() {
    return (
      <>
      <div className='contentProfile' >
        <div className='container' >
          <div className='container-heading' ><h1>User Profile</h1></div>
          <form>

            {/*Avatar*/}
              <div className = 'avatar'>
                <img src='assets/images/avatar.jpg' alt='' />
              </div>
                <div className = 'customer-name'><h1>User Name</h1></div>
                <div className = 'change'><button className='btn-change' type='file' accept="image/*">Change Avatar</button></div>
                
            {/*Enter info of customer*/}
            <div className='row align-items-center' >
              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Full Name</div>
                  <input type='text' className='form-control' id='name' placeholder='Fullname' required ></input>
                </div>
              </div>

              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Date Of Birth</div>
                  <input type='text' className='form-control' id='date-of-birth' placeholder='dd/mm/yyyy' pattern='(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}' title='Please enter a date in the format dd/mm/yyyy' required ></input>
                </div>
              </div>
            </div>

            <div className='row align-items-center' >
              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Gender</div>

                  <div className='col-2' >
                    <div className='form-check' >
                      <input  className="form-check-input"
                              type="radio"
                              value="Male"
                              name='gender'
                              id='male'/>
                      <label className='form-check-label' for='male' >Male</label>
                    </div>
                  </div>
                  
                  <div className='col-2' >
                    <div className='form-check' >
                      <input  class="form-check-input"
                              type="radio"
                              value="Female"
                              name='gender'
                              id='female' />
                      <label className='form-check-label' for='female' >Female</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Phone Number</div>
                  <input type='text' className='form-control' id='phone-number' placeholder='Phone Number' pattern='\d{10}' title='Please enter a 10-digit phone number' required ></input>
                </div>
              </div>
            </div>

            <div className='row align-items-center' >
              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Address</div>
                  <input type='text' className='form-control' id='address' placeholder='123 Paster' required ></input>
                </div>
              </div>

              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Email</div>
                  <input type='text' className='form-control' id='email' placeholder='@gmail.com' pattern='[a-zA-Z0-9._%+-]+@gmail.com' title='Please enter a valid email address ending with @gmail.com' required ></input>
                </div>
              </div>
            </div>

            {/*Requst button*/}
            <button className='btn btn-success' type='submit' >Update</button>
            <div className = 'link'><li className='nav-item' ><a className='nav-link' href='#' >Change Password</a></li></div>
            
          </form>
        </div>
      </div>
      </>
    )
  }
}
