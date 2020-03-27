import React, { useState } from 'react'
import './AuthForm.scss';

function AuthForm(props) {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    function sendAuthForm(e){
        e.preventDefault()
        props.authCredentials(login, pass)
        setLogin('')
        setPass('')
    }
    return (
        <div className='auth'>
            <form className='auth__form'>
                <div className='auth__form_title'>Auth form</div>
                <input className='auth__form_input' type='text' placeholder='login' value={login} onChange={e => setLogin(e.target.value)} />
                <input className='auth__form_input' type='password' placeholder='pass' value={pass} onChange={e => setPass(e.target.value)} />
                <input className='auth__form_btn' type='button' value='send' onClick={sendAuthForm} />
            </form>
        </div>
    )
}

export default AuthForm
