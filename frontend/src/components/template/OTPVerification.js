import { MdOutlineVerifiedUser } from "react-icons/md";
import React, { useState, useEffect, useRef } from 'react';
const OTPVerification = () => {
    const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    if (inputValues[3] !== '') {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [inputValues]);

  const handleKeyUp = (e, index) => {
    const newInputValues = [...inputValues];
    if (newInputValues[index].length > 1) {
      newInputValues[index] = '';
      setInputValues(newInputValues);
      return;
    }

    if (e.key === 'Backspace' && index > 0) {
      newInputValues[index] = '';
      for (let i = index; i < newInputValues.length; i++) {
        newInputValues[i] = '';
      }
      setInputValues(newInputValues);
      inputRefs.current[index - 1].focus();
      return;
    }

    if (newInputValues[index] !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].disabled = false;
      inputRefs.current[index + 1].focus();
    }

    setInputValues(newInputValues);
  };

  const handleChange = (e, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };
    return(
        <>
            <body className="otp_body">
                <div class="container_otp">
                    <header className="header_otp">
                        <MdOutlineVerifiedUser />
                    </header>
                    <h4>Enter OTP Code</h4>
                    <form action="#" className="form_otp">
                        <div className="input-field">
                            {inputValues.map((value, index) => (
                                <input
                                key={index}
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(e, index)}
                                onKeyUp={(e) => handleKeyUp(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                disabled={index !== 0 && inputValues[index - 1] === ''}
                                />
                            ))}
                        </div>
                        <button className={isButtonActive ? 'active' : ''}>Verify OTP</button>
                    </form>
                </div>        
            </body>
            </>
    );   
}
export default OTPVerification