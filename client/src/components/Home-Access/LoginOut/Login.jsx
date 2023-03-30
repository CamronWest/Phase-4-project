import React, {useState, useEffect} from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';



function Login({setUser}) {

    const [needSignup, setNeedSignUp] = useState(false)

    // useEffect(() => {
    // },[needSignup])


    return (

        <div>
            {needSignup ?
                <SignUpForm setUser={setUser} setNeedSignUp = {setNeedSignUp} />
                :
                <LoginForm setUser={setUser} setNeedSignUp = {setNeedSignUp} />
            }
        </div>
    )

}

export default Login