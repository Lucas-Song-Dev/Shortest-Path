class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(node) {
    this.values.push(node);
  }

  dequeue() {
    return this.values.shift();
  }

  isEmpty() {
    return this.values.length === 0;
  }

  hasValue(node) {
    return this.values.indexOf(node) >= 0;
  }
}


// Dijkstra's algorithm
export function dijkstra(grid, startNode, finishNode) {
  // Create a set to store visited nodes
  const visitedNodesInOrder = new Set();

  // Create a priority queue to store nodes that are still being considered
  // for the shortest path
  const unvisitedNodes = new PriorityQueue();

  // Set the distance for the start node to 0
  startNode.distance = 0;

  // Add the start node to the priority queue
  unvisitedNodes.enqueue(startNode);

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

    // If the neighbor has not been visited yet,
    // we can update the neighbor's distance and previous node
    if (!unvisitedNodes.hasValue(neighbor)) {
      neighbor.distance = distance;
      neighbor.previousNode = currentNode;

      // Add the neighbor to the priority queue
      unvisitedNodes.enqueue(neighbor, distance);
    }
  }
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called after the Dijkstra's algorithm above.
export function getNodesInShortestPathOrderDijkstra(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode) {
  nodesInShortestPathOrder.unshift(currentNode);
  currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
  }

  function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
    }