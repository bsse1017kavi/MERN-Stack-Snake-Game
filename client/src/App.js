import React, { useEffect, useState } from 'react';

import { Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Game from './snakeGame/Game';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import GameOver from './snakeGame/GameOver';

class Menu extends React.Component{
    componentDidMount(){
        if(localStorage["authorized"] === "false")
        {
            window.location.href = "/";    
        }    
    }
    render(){
        return(
            <div style={{ width: "20%", marginLeft:"40%", marginRight:"40%", marginTop:"20%"}}>
                    <Card>
                        <Card.Body>
                            <div className="text-center">
                                <Button variant="light" style={{ width: "50%" }}onClick={()=>{window.location.href = "/game";}}>New Game</Button><br></br><br></br>
                                <Button variant="light" style={{ width: "50%" }} onClick={()=>{window.location.href = "/score";}}>Score</Button><br></br><br></br>
                                <Button variant="light" style={{ width: "50%" }} onClick={()=>{localStorage.setItem("authorized", "false");window.location.href = "/";}}>Log Out</Button>
                            </div>
                        </Card.Body>
                    </Card>
            </div>
        );
    }
}

class Home extends React.Component{
    render(){
        return(
            <div style={{ width: "20%", marginLeft:"40%", marginRight:"40%", marginTop:"20%"}}>
                    <Card>
                        <Card.Body>
                            <div className="text-center">
                                <Button variant="light" style={{ width: "50%" }}onClick={()=>{window.location.href = "/signIn";}}>Sign In</Button><br></br><br></br>
                                <Button variant="light" style={{ width: "50%" }} onClick={()=>{window.location.href = "/signUp";}}>Sign Up</Button>
                            </div>
                        </Card.Body>
                    </Card>
            </div>
        );
    }
}

function Score(){
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(localStorage["authorized"] === "false")
        {
            window.location.href = "/";    
        }
        else axios.get('/api/user').then(res => setUsers(res.data));
    }, []);

    return(
        <div style={{ width: "20%", marginLeft:"40%", marginRight:"40%", marginTop:"15%"}}>
            {(typeof users.response === 'undefined') ?
            <p>Loading...</p>:
            <div>
                {users.response.map((user, i) => (
                <div key={i} className="text-center">
                    <Card>
                        <Card.Body>{user.username} : {user.score}</Card.Body>
                    </Card>
                    <br></br>
                </div>

                ))}
            </div>}
            <Card>
                <Card.Body>
                    <div className="text-center">
                        <Button variant="light" style={{ width: "50%" }}onClick={()=>{window.location.href = "/menu";}}>Back</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );    
}


function App() {
    return (
        <BrowserRouter>
          <div>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/menu" element={<Menu/>} />
                <Route path="/game" element={<Game/>} />
                <Route path="/score" element={<Score/>} />
                <Route path="/signIn" element={<SignIn/>} />
                <Route path="/signUp" element={<SignUp/>} />
                <Route path="/gameOver/:score" element={<GameOver/>} />
            </Routes>
          </div>
        </BrowserRouter>
    );

}

export default App;