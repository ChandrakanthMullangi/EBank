import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Home extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/ebank/login')
  }

  render() {
    return (
      <div className="home">
        <div className="header">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
              alt="website logo"
            />
          </Link>
          <button
            type="button"
            className="logout-button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="digital-card-container">
          <h1 className="heading"> Your Flexibility, Our Excellence </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    )
  }
}

export default Home
