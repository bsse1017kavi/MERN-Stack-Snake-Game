import React, {useEffect} from 'react';
import { Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function GameOver(){

    let { score } = useParams();

    useEffect(() => {
        if(localStorage["authorized"] === "false")
        {
            window.location.href = "/";    
        } 
    }, [])

    return(
        <div style={{ width: "20%", marginLeft:"40%", marginRight:"40%", marginTop:"20%"}}>
                <Card>
                    <Card.Body>
                        <div className="text-center">
                            <h3>Game Over!</h3>
                            <h3>Score: {score}</h3><br></br>
                            <Button variant="light" style={{ width: "50%" }} onClick={()=>{window.location.href = "/game";}}>Retry</Button>
                        </div>
                    </Card.Body>
                </Card>
        </div>
    );   
}

export default GameOver;