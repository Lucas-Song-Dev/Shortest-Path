import React, { Component } from "react";

import Node from "./components/node";
import Modal from './components/Modal'; // import the Modal component
import TextAnimation from "./components/animations";
import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from "./Algos/dijkstra";
import { aStar, getNodesInShortestPathOrderaStar } from "./Algos/aStar";

const getInitialGrid = (height, width) => {
  const grid = [];
  for (let row = 0; row < height / 25; row++) {
    const currentRow = [];
    for (let col = 0; col < width / 25; col++) {
      if(col == 15 && row == 15){
        currentRow.push(createSpecialNode(col, row, 0));
      }
      else if(col == 18 && row == 10){
        currentRow.push(createSpecialNode(col, row, 1));
      }
      else if(col == 20 || (row %12 == 0 && col != 10) || ((col % 7 == 0 || col% 2 == 0) && row%8 == 0)){
        currentRow.push(createSpecialNode(col, row, 2));
      }
      else{
        currentRow.push(createNode(col, row));
      }
    }
    grid.push(currentRow);
  }
  return grid;
};

//only resets start
const startGrid = (Grid, height, width) => {
  const newGrid = [];
  for (let row = 0; row < height / 25; row++) {
    const currentRow = [];
    for (let col = 0; col < width / 25; col++) {
      const node = Grid[row][col];
      currentRow.push({
        col,
        row,
        distance: Infinity,
        isVisited: false,
        isWall: node.isWall,
        previousNode: null,
        isStart: false,
        isFinish: node.isFinish,
      });
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

//only resets finish
const finishGrid = (Grid, height, width) => {
  const newGrid = [];
  for (let row = 0; row < height / 25; row++) {
    const currentRow = [];
    for (let col = 0; col < width / 25; col++) {
      const node = Grid[row][col];
      currentRow.push({
        ...node,
        col,
        row,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        isFinish: false,
      });
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isStart: false,
    isFinish: false,
  };
};

const createSpecialNode = (col, row, type) => {
  return {
    col,
    row,
    distance: Infinity,
    isVisited: false,
    isWall: type == 2? true: false,
    previousNode: null,
    isStart: type == 0? true: false,
    isFinish: type == 1? true: false,
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      bck: [],
      startPressed: false,
      mouseIsPressed: false,
      finishPressed: false,
      erasePressed: false,
      startX: 15,
      startY: 15,
      finishX: 18,
      finishY: 10,
      width: 0,
      height: 0,
      shortLength: 0,
      bckOn: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleErase = this.handleErase.bind(this);
    this.handleContactTransition = this.handleContactTransition.bind(this);
    this.animateAlgorithm = this.animateAlgorithm.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const grid = getInitialGrid(window.innerHeight, window.innerWidth);
    this.setState({
      grid,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  handleMouseDown(row, col) {
    const newGrid = this.state.grid;
    const node = newGrid[row][col];

    const newNode = {
      ...node,
      isWall: this.state.startPressed
        ? false
        : this.state.bckOnNode
        ? false
        : this.state.finishPressed
        ? false
        : this.state.erasePressed
        ? false
        : true,
      isStart: this.state.startPressed ? true : false,
      isFinish: this.state.finishPressed ? true : false,
      isVisited: this.state.erasePressed ? false : node.isVisited,
    };

    newGrid[row][col] = newNode;

    if (this.state.startPressed) {
      this.setState({
        startX: col,
        startY: row,
        grid: newGrid,
        mouseIsPressed: true,
        startPressed: false,
      });
    } else if (this.state.finishPressed) {
      this.setState({
        finishX: col,
        finishY: row,
        grid: newGrid,
        mouseIsPressed: true,
        startPressed: false,
        finishPressed: false,
      });
    } else if (this.state.bckOnNode) {
      const grid = [];
      for (let row = 0; row < this.state.height / 25; row++) {
        const currentRow = [];
        for (let col = 0; col < this.state.width / 25; col++) {
          document.getElementById(`node-${row}-${col}`).className = "node";
          currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
      }
      for (let rowO = 0; rowO < 10; rowO++) {
        for (let colO = 0; colO < 20; colO++) {
          setTimeout(() => {
            document.getElementById(`node-${rowO}-${colO}`).className =
              "node node-black";
          }, 25 * ((7 * Math.abs(rowO - row)) / 4 + (2 * Math.abs(colO - col - 10)) / 4));
        }
      }
      for (let rowO = 4; rowO < 5; rowO++) {
        for (let colO = 5; colO < 12; colO++) {
          setTimeout(() => {
            document.getElementById(`node-${rowO}-${colO}`).className =
              "node node-black node-black-transparent-top";
          }, 35 * ((7 * Math.abs(rowO - row)) / 4 + (2 * Math.abs(colO - col - 10)) / 4));
        }
      }
      for (let rowO = 5; rowO < 6; rowO++) {
        for (let colO = 5; colO < 12; colO++) {
          setTimeout(() => {
            document.getElementById(`node-${rowO}-${colO}`).className =
              "node node-black node-black-transparent-bottom";
          }, 35 * ((7 * Math.abs(rowO - row)) / 4 + (2 * Math.abs(colO - col - 10)) / 4));
        }
      }

      setTimeout(() => {
        document.getElementById(`node-${4}-${4}`).className =
          "node node-black node-black-transparent-top-left";
      }, 35 * ((7 * Math.abs(4 - row)) / 4 + (2 * Math.abs(4 - col - 10)) / 4));
      setTimeout(() => {
        document.getElementById(`node-${5}-${4}`).className =
          "node node-black node-black-transparent-bottom-left";
      }, 35 * ((7 * Math.abs(5 - row)) / 4 + (2 * Math.abs(4 - col - 10)) / 4));

      this.setState({
        grid,
        startPressed: false,
        finishPressed: false,
        erasePressed: false,
        bckOn: true,
      });
    } else {
      this.setState({
        grid: newGrid,
        mouseIsPressed: true,
        startPressed: false,
      });
    }
  }

  handleMouseEnter(row, col) {
    if (this.state.mouseIsPressed) {
      const newGrid = this.state.grid;
      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isWall: this.state.finishPressed
          ? false
          : this.state.erasePressed
          ? false
          : true,
        isFinish: this.state.finishPressed ? true : false,
      };

      newGrid[row][col] = newNode;
      const grid = newGrid;
      this.setState(grid);
    }
  }
  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleStart() {
    for (let row = 0; row < this.state.height / 25; row++) {
      for (let col = 0; col < this.state.width / 25; col++) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-visited" ||
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-shortest-path"
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    const grid = startGrid(
      this.state.grid,
      this.state.height,
      this.state.width
    );
    this.setState({
      startPressed: true,
      finishPressed: false,
      erasePressed: false,
      grid,
    });
  }
  handleFinish() {
    for (let row = 0; row < this.state.height / 25; row++) {
      for (let col = 0; col < this.state.width / 25; col++) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-visited" ||
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-shortest-path"
        ) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-exit";
        }
      }
    }
    const grid = finishGrid(
      this.state.grid,
      this.state.height,
      this.state.width
    );
    this.setState({
      finishPressed: true,
      startPressed: false,
      erasePressed: false,
      grid,
    });
  }

  handleReset() {
    const grid = [];
    for (let row = 0; row < this.state.height / 25; row++) {
      const currentRow = [];
      for (let col = 0; col < this.state.width / 25; col++) {
        document.getElementById(`node-${row}-${col}`).className = "node";
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    this.setState({
      grid,
      startPressed: false,
      finishPressed: false,
      erasePressed: false,
    });
  }

  handleErase() {
    this.setState({
      erasePressed: !this.state.erasePressed,
      startPressed: false,
      finishPressed: false,
    });
  }
  handleResetAnimations() {
    for (let row = 0; row < window.innerHeight / 25; row++) {
      for (let col = 0; col < window.innerWidth / 25; col++) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-exit"
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    const iterator1 = visitedNodesInOrder.values();
    for (let i = 0; i <= visitedNodesInOrder.size; i++) {
      if (i === visitedNodesInOrder.size) {
        setTimeout(() => {
          this.animateAlgorithimShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = iterator1.next().value;
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateAlgorithimShortestPath(nodesInShortestPathOrder) {
    const iterator2 = nodesInShortestPathOrder.values();
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = iterator2.next().value;
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeAlgorithim(algorithm) {
    for (let row = 0; row < this.state.height / 25; row++) {
      for (let col = 0; col < this.state.width / 25; col++) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-visited" ||
          document.getElementById(`node-${row}-${col}`).className ===
            "node node-shortest-path"
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    const { grid } = this.state;
    const startNode = grid[this.state.startY][this.state.startX];
    const finishNode = grid[this.state.finishY][this.state.finishX];
    let visitedNodesInOrder = [];
    let nodesInShortestPathOrder = [];
    if (algorithm === 0) {
      visitedNodesInOrder = aStar(grid, startNode, finishNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrderaStar(finishNode);
    } else {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      nodesInShortestPathOrder =
        getNodesInShortestPathOrderDijkstra(finishNode);
    }
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  handleContactTransition() {
    {
      const grid = [];
      for (let row = 0; row < this.state.height / 25; row++) {
        const currentRow = [];
        for (let col = 0; col < this.state.width / 25; col++) {
          document.getElementById(`node-${row}-${col}`).className = "node";
          currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
      }
      for (let rowO = 0; rowO < 10; rowO++) {
        for (let colO = 0; colO < 20; colO++) {
          setTimeout(() => {
            document.getElementById(`node-${rowO}-${colO}`).className =
              "node node-black";
          }, 25 * ((7 * Math.abs(rowO - 20)) / 4 + (2 * Math.abs(colO - 35 - 10)) / 4));
        }
      }
      for (let rowO = 4; rowO < 5; rowO++) {
        for (let colO = 5; colO < 12; colO++) {
          setTimeout(() => {
            document.getElementById(`node-${rowO}-${colO}`).className =
              "node node-black node-black-transparent-top";
          }, 35 * ((7 * Math.abs(rowO - 20)) / 4 + (2 * Math.abs(colO - 35 - 10)) / 4));
        }
      }
      for (let rowO = 5; rowO < 6; rowO++) {
        for (let colO = 5; colO < 12; colO++) {
          setTimeout(() => {
            document.getElementById(`node-${rowO}-${colO}`).className =
              "node node-black node-black-transparent-bottom";
          }, 35 * ((7 * Math.abs(rowO - 20)) / 4 + (2 * Math.abs(colO - 35 - 10)) / 4));
        }
      }

      setTimeout(() => {
        document.getElementById(`node-${4}-${4}`).className =
          "node node-black node-black-transparent-top-left";
      }, 35 * ((7 * Math.abs(4 - 20)) / 4 + (2 * Math.abs(4 - 35 - 10)) / 4));
      setTimeout(() => {
        document.getElementById(`node-${5}-${4}`).className =
          "node node-black node-black-transparent-bottom-left";
      }, 35 * ((7 * Math.abs(5 - 20)) / 4 + (2 * Math.abs(4 - 35 - 10)) / 4));

      this.setState({
        grid,
        startPressed: false,
        finishPressed: false,
        erasePressed: false,
        bckOn: true,
        bckOnNode: !this.state.bckOnNode,
      });
    }
  }

  render() {
    const {
      grid = getInitialGrid(this.state.height, this.state.width),
      mouseIsPressed,
      startPressed,
      finishPressed,
      erasePressed,
      bckOnNode,
      bckOn,
    } = this.state;

    return (
      <>
        <div>
            <Modal bckOn={bckOn}/>
            
        </div>
        <TextAnimation isBlack={bckOn} />
        <button
          className={`btn posStart m-2 ${bckOn ? "btn-disabled" : ""} ${
            startPressed ? "btn-finishOn" : "btn-finishOff"
          }`}
          onClick={this.handleStart}
        >
          Start
        </button>
        <button
          className={`btn posFinish ${
            finishPressed ? "btn-finishOn" : "btn-finishOff"
          } ${bckOn ? "btn-disabled" : ""} m-2 `}
          onMouseDown={this.handleFinish}
          onMouseUp={this.handleResetAnimations}
        >
          Finish
        </button>
        <button
          className={`btn btn-items btn-reset m-2 posReset ${
            bckOn ? "btn-disabled" : ""
          } `}
          onClick={this.handleReset}
        >
          Reset
        </button>
        <button
          className={`btn posErase ${
            erasePressed ? "btn-finishOn" : "btn-finishOff"
          } ${bckOn ? "btn-disabled" : ""} m-2`}
          onClick={this.handleErase}
        >
          Eraser
        </button>
        <button
          className={`btn posVis m-2 ${bckOn ? "btn-disabled" : ""} m-2`}
          onClick={() => this.visualizeAlgorithim(1)}
        >
          Visualize Dijkstra's Algorithm
        </button>

        <button
          className={`btn  m-2 ${bckOn ? "btn-next" : "posNext"}
            ${bckOnNode ? "btn-finishOn" : "btn-finishOff"} 
            `}
          onClick={this.handleContactTransition}
        >
          Contact
        </button>
        <button
          className={`btn posaStar ${bckOn ? "btn-disabled" : ""} m-2`}
          onClick={() => this.visualizeAlgorithim(0)}
        >
          Visualize A* Algorithm
        </button>

        <>
          <div className={`grid ${bckOn ? "zIndex grid-black" : ""}`}>
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx} className={`row ${bckOn ? "row-black" : ""}`}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isFinish, isStart, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        startPressed={startPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      </>
    );
  }
}

export default App;
