import React, { Component } from 'react'
import FBLogin from './FacebookPage'


export default class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            pass: "",
        }
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
        console.log(this.state.email);
    }

    handlePasswordChange = (event) => {
        this.setState({
            pass: event.target.value
        });
        console.log(this.state.pass);
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.pass
                }),
            }).then((res) => { return res.json(); });
            console.log('data frontend login', data);
            this.setState({
                email: '',
                pass: '',
            })
            if (!data.success) {
                this.setState({
                    errMessage: data.message,
                });
            } else {
                //save data to localStorage
                localStorage.setItem('myValueInLocalStorage',data.data.email);
                console.log("thanh cong");
                window.location.href = "http://localhost:3000/";
            }
        } catch (err) {
            this.setState({
                errMessage: err.message
            });
        } finally {
            this.setState({
                loading: false
            });
        }

    }
    render() {
        return (
            // <form action="/action_page.php" onSubmit={this.handleFormSubmit}>
            //     <label htmlFor="fname">Email:</label><br />
            //     <input type="text" id="fname" name="email" value={this.state.email} onChange={this.handleEmailChange} required /><br />
            //     <label htmlFor="lname">Password:</label><br />
            //     <input type="text" id="lname" name="password" value={this.state.pass} onChange={this.handlePasswordChange} required /><br /><br />
            //     <input type="submit" defaultValue="Submit" />

            //     {this.state.errMessage ? (
            //                     <div className="alert alert-danger" role="alert">
            //                         {this.state.errMessage}
            //                     </div>
            //                 ) : null}

            // </form>
            <form onSubmit={this.handleFormSubmit}>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleEmailChange} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" value={this.state.pass} onChange={this.handlePasswordChange} required /><br />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                <FBLogin></FBLogin>

                {this.state.errMessage ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.errMessage}
                    </div>
                ) : null}
            </form>

        );
    }
}