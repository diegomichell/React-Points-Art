import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Circle } from "react-konva";

const initialX = window.innerWidth / 2 + 25 - 12.5;
const initialY = window.innerHeight / 2 + 25 - 12.5;

/**
 * @author Diego Michel
 */

class ColoredRect extends React.Component {
  state = {
    x: initialX,
    y: initialY,
    circles: [{ pos: { x: 0, y: 0 }, color: Konva.Util.getRandomColor() }],
    increment: 0
  };

  componentDidMount() {
    window.onmousemove = e => {
      setTimeout(() => {
        const x = e.offsetX;
        const y = e.offsetY;

        this.setState({
          x,
          y
        });
      }, 100);
    };
  }

  handleClick = () => {
    const { circles, increment } = this.state;
    const latest = circles[circles.length - 1];
    const even = circles.length % 2 === 0;
    const k = increment + 75;

    this.setState({
      circles: [
        ...circles,
        {
          pos: {
            x: latest.pos.x + (even ? -k : k),
            y: latest.pos.y + (even ? 0 : 75)
          },
          color: Konva.Util.getRandomColor()
        }
      ],
      increment: k
    });
  };

  render() {
    const { x, y } = this.state;
    return this.state.circles.map(val => {
      return (
        <Circle
          x={x + val.pos.x}
          y={y + val.pos.y}
          width={50}
          height={50}
          fill={val.color}
          onClick={this.handleClick}
        />
      );
    });
  }
}

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <ColoredRect />
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById("root"));
