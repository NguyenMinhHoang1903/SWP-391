import React, { Component } from 'react'
import './Content.css'

export default class Content extends Component {
  render() {
    return (
      <>
      <div className='content' >
        <div className='container' >
          <div className='container-heading' ><h1>Create Combo</h1></div>
          <form>

            {/*Enter new password*/}
                <div className = 'combo'>
                  <div className = 'create-combo'>
                    <div className='input-group mb-3' >
                      <div class="input-group-text">Combo Name</div>
                      <input type='text' className='form-control' id='old-pass' placeholder='Enter' required ></input>
                    </div>

                    <div className='input-group mb-3' >
                      <div class="input-group-text">New Password</div>
                      <input type='text' className='form-control' id='new-pass' placeholder='Enter' pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$'
                            title='Please enter a password with at least 8 characters including one lowercase letter, one uppercase letter, one number, and one special character.' required ></input>
                    </div>

                    <div className='input-group mb-3' >
                      <div class="input-group-text">Confirm Password</div>
                      <input type='text' className='form-control' id='confirm-pass' placeholder='Enter' required ></input>
                    </div>
                  </div>
                </div>

            {/*Requst button*/}
            <button className='btn btn-success' type='submit'>Submit</button>
          </form>
        </div>
      </div>
      </>
    )
  }
}
