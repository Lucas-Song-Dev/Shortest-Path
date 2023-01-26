// PriorityQueue class
class PriorityQueue {
  // Constructor
  constructor() {
    this.values = [];
  }

  // Enqueue method
  enqueue(node, priority) {
    this.values.push({ node, priority });
    this.sort();
  }

  // Dequeue method
  dequeue() {
    return this.values.shift().node;
  }

  // Sort method
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }

  // Is empty method
  isEmpty() {
    return this.values.length === 0;
  }

  // Has value method
  hasValue(node) {
    return this.values.findIndex((value) => value.node === node) >= 0;
  }
}

// A* (A-star) algorithm
export function aStar(grid, startNode, finishNode) {
  // Create a set to store visited nodes
  const visitedNodesInOrder = new Set();

  // Create a priority queue to store nodes that are still being considered
  // for the shortest path
  const unvisitedNodes = new PriorityQueue();

  // Set the distance for the start node to 0
  startNode.distance = 0;

  // Add the start node to the priority queue
  unvisitedNodes.enqueue(startNode, 0);

  // While the priority queue is not empty
  while (!unvisitedNodes.isEmpty()) {
    // Dequeue the next node from the priority queue
    const currentNode = unvisitedNodes.dequeue();

    // If we encounter a wall, we skip it
    if (currentNode.isWall) continue;

    // Add the current node to the visited set
    visitedNodesInOrder.add(currentNode);

    // If we have reached the finish node, we can stop
    if (currentNode === finishNode) return visitedNodesInOrder;

    // Update the distances for the current node's neighbors
    updateNeighbors(
      currentNode,
      grid,
      finishNode,
      unvisitedNodes,
      visitedNodesInOrder
    );
  }
}

function updateNeighbors(
  currentNode,
  grid,
  finishNode,
  unvisitedNodes,
  visitedNodesInOrder
) {
  // Get the current node's neighbors
  const neighbors = getNeighbors(currentNode, grid);

  // For each neighbor...
  for (const neighbor of neighbors) {
    // If the neighbor has already been visited, we can skip it
    if (visitedNodesInOrder.has(neighbor)) continue;
    // Calculate the new distance to the neighbor
    // using the current node as the starting point
    const distance = currentNode.distance + 1;

    // If the new distance is shorter than the previous distance,
    // or if the neighbor has not been visited yet,
    // we can update the neighbor's distance and previous node
    if (distance < neighbor.distance || !unvisitedNodes.hasValue(neighbor)) {
      neighbor.distance = distance;
      neighbor.previousNode = currentNode;

      // Calculate the total distance to the neighbor (distance + heuristic)
      const totalDistance =
        neighbor.distance + getHeuristic(neighbor, finishNode);

      // Add the neighbor to the priority queue
      unvisitedNodes.enqueue(neighbor, totalDistance);
    }
  }
}

function getHeuristic(node, finishNode) {
  // Calculate the heuristic by using the Manhattan distance formula
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called after the aStar method above.
export function getNodesInShortestPathOrderaStar(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

function getNeighbors(node, grid) {
  // Initialize an empty array to store the neighbors
  const neighbors = [];
  // Get the row and column of the current node
  const { col, row } = node;

  // Check the top, right, bottom, and left neighbor positions
  // and add them to the array if they are valid
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  // Return the array of neighbors
  return neighbors;
}
