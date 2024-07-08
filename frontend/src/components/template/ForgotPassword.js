import React, { useState } from 'react';
const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
  

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    return(
        <body className="forgotBody">
            <div className='container_forgotpass'>
            <div className="form-containerForgotPassword forgot">
                <form className='item_forgot'>
                    <h1>Create Account</h1>
                    <input 
                    type="email" 
                    placeholder="Enter Email"
                    />
                    <input 
                        type="text" 
                        placeholder="Enter User Name" 
                    />
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder="Enter your password" 
                    />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        required
                    />
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

            </div>
        </body>
    );
}
export default ForgotPassword