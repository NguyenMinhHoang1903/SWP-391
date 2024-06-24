const ChangePassword = () => {
    return (
      <>
      <div className='contentChangePassWord' >
        <div className='container' >
          <div className='container-heading' ><h1>Change Password</h1></div>
          <form>

            {/*Avatar*/}
              <div className = 'avatar'>
                <img src='Logo.png' alt='' />
              </div>
                <div className = 'user-name'><h1>User Name</h1></div>
                
            {/*Enter new password*/}
                <div className = 'change'>
                  <div className = 'change-password'>
                    <div className='input-group mb-3' >
                      <div class="input-group-text">Old Password</div>
                      <input type='text' className='form-control' id='old-pass' placeholder='Enter' required ></input>
                    </div>

                    <div className='input-group mb-3' >
                      <div class="input-group-text">New Password</div>
                      <input type='text' className='form-control' id='new-pass' placeholder='Enter' required ></input>
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
export default ChangePassword;
