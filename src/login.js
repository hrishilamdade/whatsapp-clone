import { Button } from '@material-ui/core'
import React from 'react'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import "./login.css"
// import { 19o,9l 97ou } from '@material-ui/core/colors';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
function Login() {
    const [{},dispatch]=useStateValue();
    const signIn=()=>{
        auth.signInWithPopup(provider).then(result=>{
               dispatch({
                   type:actionTypes.SET_USER,
                   user:result.user,
               })

        }).catch(error=>
                alert(error.message)    
            )
    }
    return (
        <div className="login">
            <div className="login-container">
                <WhatsAppIcon  />
                <div className="login-text">
                    <h1>Sign In to WhatsApp</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
