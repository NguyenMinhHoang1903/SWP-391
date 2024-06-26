import React, { useContext, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import Context from '../../context';

const Login = () => {

  const [error] = useState('')
  const navigate = useNavigate()
  const {fetchUserDetails} = useContext(Context)

  const [showPassword, setShowPassword] = useState(false);
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Chang login and register
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };
  // Enter user name and password
  const [data,setData] = useState({
    email :"",
    name :"",
    password :"",
    confirmPassword :"",
  })

  const handleOnChange = (e) => {
    const { name , value } = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(data.password.length < 6){
      toast.error ("Password must be at least 6 characters")
      return;
    }
    if (data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.signUp.url,{
        method : SummaryApi.signUp.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()

      if (dataApi.success){
        toast.success(dataApi.message)
      }
      if (dataApi.error){
        toast.error(dataApi.message)
      }
    } else {
      toast.error("Please check password and confirm password")
    }
  }


  const handleLogin = async(e) =>{
    e.preventDefault()
    const dataResponseLogin = await fetch(SummaryApi.signIn.url,{
      method : SummaryApi.signIn.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const dataApiLogin = await dataResponseLogin.json()
    if(dataApiLogin.success){
      toast.success(dataApiLogin.message)
      navigate('/')
      fetchUserDetails()
    }

    if(dataApiLogin.error){
      toast.error(dataApiLogin.message)
    }
  }
  // const google = () => {
  //   window.open(SummaryApi.google_profile.url, "_self");
  // };

  const google = () => {
    window.open(SummaryApi.google_callback.url, "_self");
  };


  // const google = async(e) =>{
  //   e.preventDefault()
  //   const dataResponseLoginGoogle = await window(SummaryApi.google_profile.url,{
  //     method : SummaryApi.google_profile.method,
  //     credentials : 'include',
  //     headers : {
  //       "content-type" : "application/json"
  //     },
  //     body : JSON.stringify(data)
  //   })

  //   const dataApiLoginGoogle = await dataResponseLoginGoogle.json()
  //   if(dataApiLoginGoogle.success){
  //     toast.success(dataApiLoginGoogle.message)
  //     navigate('/')
  //     fetchUserDetails()
  //   }

  //   if(dataApiLoginGoogle.error){
  //     toast.error(dataApiLoginGoogle.message)
  //   }
  // }



    return(
        <body className="loginBody">
          <div id="containerLogin" className={`containerLogin ${isActive ? 'active' : ''}`}>
            <div className="form-containerLogin Loginsign-up">
              <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <input 
                  type="email" 
                  placeholder="Enter Email"
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required 
                  />
                  <input 
                    type="text" 
                    placeholder="Enter User Name" 
                    name='name'
                    value={data.name}
                    onChange={handleOnChange} 
                    required
                  />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={data.password}
                    name='password'
                    onChange={handleOnChange}
                    placeholder="Enter your password" 
                    required
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={data.confirmPassword}
                    name='confirmPassword'
                    onChange={handleOnChange}
                    required
                  />
                  <span>
                  {error && <p className="error">{error}</p>}
                  </span>
                  <div class="checkbox">
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={toggleShowPassword}
                    />Show Password
                  </div>
                  <button class="btnn">Sign Up</button>
              </form>
            </div>
            <div className="form-containerLogin Loginsign-in">
              <form onSubmit={handleLogin}>
                <h1>Sign In</h1>


                <div className='loginContainer' onClick={google}>
                  <img src="Google_Icons.png"/>
                  <div className='title'>Login with Google</div>
                </div>
                <span>or use your account</span>
                <input 
                  type="text" 
                  placeholder="User Name"
                  name='name'
                  value={data.name}
                  onChange={handleOnChange} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  placeholder="Enter your password" 
                />
                <div>
                  <div class="checkbox">
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={toggleShowPassword}
                      />Show Password
                  </div>
                </div>
                <Link to = {'/forgotpassword'} className='block w-fit ml-auto hover:underline'>
                  Forgot password ?
                </Link>
                <button class="btnn">Sign In</button>
              </form>
            </div>
            <div className="toggle-containerLogin">
              <div className="Logintoggle">
                <div className="toggle-panelLogin Logintoggle-left">
                  <h1>Welcome Back!</h1>
                  <p>Enter your personal details to use all of site features</p>
                  <button class="btnn" id="login" onClick={handleLoginClick}>Sign In</button>
                </div>
                <div className="toggle-panelLogin Logintoggle-right">
                  <h1>Hello, Friend!</h1>
                  <p>Register with your personal details to use all of site features</p>
                  <button class="btnn" id="register" onClick={handleRegisterClick}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </body>
    );
}
export default Login;