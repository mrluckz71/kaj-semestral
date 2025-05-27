import React from 'react';


// This is a simple Forgot Password page component
function ForgotPassword() {

    return (
        <div className="forgot-password-site">
            <h1>Forgot Password</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required/>
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
}

export default ForgotPassword;