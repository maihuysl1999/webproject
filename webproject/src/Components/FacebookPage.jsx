import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'

export default class RegisterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            pass: "",
        }
    };



    responseFacebook = (response) => {
        console.log(response)
        axios({
            method: "GET",
            url: "http://localhost:5000/auth-fb/facebook",
            //data: { userID: response.userID, accessToken: response.accessToken }
        }).then(response => {
            console.log("FaceBook login success, client side", response);
        })
    }

    render() {
        return (
            <div>
                <FacebookLogin
                    appId="2678016712451988"
                    autoLoad={false}
                    callback={this.responseFacebook}
                    icon="fa-facebook-square"
                    cssClass="fb-customisation"
                    textButton={'Continue with facebook'}
                />
            </div >
        )
    }
}