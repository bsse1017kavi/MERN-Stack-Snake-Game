import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

class SignIn extends React.Component{
    constructor(props) {
    super(props);
    this.state = 
    {
        username: '',
        password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = JSON.stringify({"username": this.state.username, "password": this.state.password})
        axios.post('/api/user/login',  data , { headers: {
            'Content-Type': 'application/json'
        }}).then(res => {
            if(res.data.response === null)
            {
                alert("Username or Password does not match")
                return;    
            }
            else
            {
                alert("Logged in");
                localStorage.setItem("authorized", "true");
                localStorage.setItem('id', res.data.response._id)
                localStorage.setItem('highScore', res.data.response.score)
                window.location.href = "/menu";
            }
        });
    }

    render(){
        return(
            <div style={{ width: "20%", marginLeft:"40%", marginRight:"40%", marginTop:"15%"}}>
                <Card>
                    <Card.Body>
                    <form onSubmit={this.handleSubmit}>
                        <label>Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /> <br></br> <br></br>
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /> <br></br> <br></br>
                        <div style={{textAlign: "center"}}>  
                            <input type="submit" value="Submit" />  
                        </div>
                    </form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default SignIn;