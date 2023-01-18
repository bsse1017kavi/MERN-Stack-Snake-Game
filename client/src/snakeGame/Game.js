import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [[0, 0]],
      food: [5, 5],
      direction: "right",
      score: 0,
      highScore: localStorage["highScore"]
    };
  }

  reinitialize(){
    this.setState({
      snake: [[0, 0]],
      food: [5, 5],
      direction: "right",
      score: 0
    });
    // setInterval(this.moveSnake, 150);
  }

  componentDidMount() {
    if(localStorage["authorized"] === "false")
    {
        window.location.href = "/";    
    } 
    document.onkeydown = this.onKeyDown;
    setInterval(this.moveSnake, 150);
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        !['down', 'up'].includes(this.state.direction) && this.setState({ direction: "up" });
        break;
      case 40:
        !['down', 'up'].includes(this.state.direction) && this.setState({ direction: "down" });
        break;
      case 37:
        !['left', 'right'].includes(this.state.direction) && this.setState({ direction: "left" });
        break;
      case 39:
        !['left', 'right'].includes(this.state.direction) && this.setState({ direction: "right" });
        break;
      default:
        break;
    }
  };

  moveSnake = () => {
    let snake = [...this.state.snake];
    let [headX, headY] = snake[snake.length - 1];
    switch (this.state.direction) {
      case "up":
        headY--;
        break;
      case "down":
        headY++;
        break;
      case "left":
        headX--;
        break;
      case "right":
        headX++;
        break;
      default:
        break;
    }

    snake.push([headX, headY]);
    if (headX === this.state.food[0] && headY === this.state.food[1]) {
      this.setState({
        food: [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)],
        score: this.state.score + 1,
      });

      this.setState({
        highScore: this.state.score >= this.state.highScore ? this.state.score+1 : this.state.highScore
      });
    } else {
      snake.shift();
    }
    this.setState({ snake });
    if (
      headX < 0 ||
      headX > 29.75 ||
      headY < 0 ||
      headY > 19.75 ||
      this.checkCollision(headX, headY, snake)
    ) {
      // alert("Game Over!");
      if(this.state.score >= this.state.highScore)
      {
        localStorage.setItem('highScore', this.state.score)
        let data = JSON.stringify({"userID": localStorage["id"], "score": localStorage["highScore"]})
        axios.post('/api/user/update',  data , { headers: {
            'Content-Type': 'application/json'
        }}).then(res => {
            console.log(res)
        });
      }
      clearInterval(this.interval);
      window.location.href = `/gameOver/${this.state.score}`;
      this.reinitialize();
    }
  };

  checkCollision(x, y, snake) {
    for (let i = 0; i < snake.length - 1; i++) {
        let [snakeX, snakeY] = snake[i];
        if (x === snakeX && y === snakeY) return true;
    }
    return false;

  }


  render() {
    return (
      <div>
        <div className="board">
          {this.state.snake.map(([x, y], index) => (
            <div
              key={index}
              className="dot"
              style={{ left: `${x * 20}px`, top: `${y * 20}px` }}
            ></div>
          ))}
          <div
            className="food"
            style={{
              left: `${this.state.food[0] * 20}px`,
              top: `${this.state.food[1] * 20}px`,
            }}
          ></div>
        </div>
        <div style={{textAlign: "center"}}><h3>Score: {this.state.score}</h3></div><br></br>
        <div style={{textAlign: "center"}}><h3>High Score: {this.state.highScore}</h3></div><br></br>
        <div style={{ width: "20%", marginLeft:"40%", marginRight:"40%", marginTop:"5%"}}>
          <Card>
              <Card.Body>
                  <div className="text-center">
                      <Button variant="light" style={{ width: "50%" }}onClick={()=>{window.location.href = "/menu";}}>Back</Button>
                  </div>
              </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default Game;