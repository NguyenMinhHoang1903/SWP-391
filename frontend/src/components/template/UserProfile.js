const UserProfile = () =>{
    return(
        <>
      <div className='contentProfile' >
        <div className='container' >
          <div className='container-heading' ><h1>Profile</h1></div>
          <form>

            {/*Avatar*/}
              <div className = 'avatar'>
                <img src='assets/imgs/avatar.jpg' alt='' />
              </div>
                <div className = 'customer-name'><h1>User Name</h1></div>
                <div className = 'change'><button className='btn-change' type='file' accept="image/*">Change Avatar</button></div>
                
            {/*Enter info of customer*/}
            <div className='row align-items-center' >
              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Accumulated Points</div>
                  <div class="input-group-text">Point</div>
                </div>
              </div>

              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Date Of Birth</div>
                  <input type='text' className='form-control' id='date-of-birth' placeholder='dd/mm/yyyy' required ></input>
                </div>
              </div>
            </div>

            <div className='row align-items-center' >
              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Gender</div>
                  <input type='text' className='form-control' id='gender' placeholder='Male/Female' required ></input>
                </div>
              </div>
              <div className='col-6' >
                <div className='input-group mb-3' >
                  <div class="input-group-text">Phone Number</div>
                  <input type='text' className='form-control' id='phone-number' placeholder='Phone Number' required ></input>
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
                  <input type='text' className='form-control' id='email' placeholder='@gmail.com' required ></input>
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
    );
}
export default UserProfile;