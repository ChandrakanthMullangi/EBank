import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userID: '', pin: '', errorMsg: '', showSubmitError: false}

  onChangeUserID = event => {
    this.setState({userID: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    const {userID, pin} = this.state

    const userDetails = {user_id: userID, pin}

    const loginApiUrl = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userID, pin, errorMsg, showSubmitError} = this.state

    return (
      <div className="login">
        <div className="login-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="login-form-container">
            <h1 className="login-form-heading">Welcome Back!</h1>
            <form className="form" onSubmit={this.submitForm}>
              <label htmlFor="userId" className="label">
                User ID
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter User ID"
                id="userId"
                value={userID}
                onChange={this.onChangeUserID}
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                type="password"
                className="input"
                placeholder="Enter PIN"
                id="pin"
                value={pin}
                onChange={this.onChangePin}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-message"> {errorMsg} </p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
