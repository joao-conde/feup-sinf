import { Injectable } from '@angular/core';
import { OrderLine } from '@app/_models';

@Injectable({
  providedIn: 'root'
})

class Comparator {
  compare;

  constructor(compareFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a, b) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  equal(a, b) {
    return this.compare(a, b) === 0;
  }

  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }

  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}

class Graph {
  vertices;
  edges;
  isDirected;

  constructor(isDirected = false) {
    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }

  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex;

    return this;
  }

  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey];
  }

  getNeighbors(vertex) {
    return vertex.getNeighbors();
  }

  getAllVertices() {
    return Object.values(this.vertices);
  }

  getAllEdges() {
    return Object.values(this.edges);
  }

  addEdge(edge) {
    // Try to find and end start vertices.
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    // Insert start vertex if it wasn't inserted.
    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    // Insert end vertex if it wasn't inserted.
    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    // Check if edge has been already added.
    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before');
    } else {
      this.edges[edge.getKey()] = edge;
    }

    // Add edge to the vertices.
    if (this.isDirected) {
      // If graph IS directed then add the edge only to start vertex.
      startVertex.addEdge(edge);
    } else {
      // If graph ISN'T directed then add the edge to both vertices.
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  deleteEdge(edge) {
    // Delete edge from the list of edges.
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()];
    } else {
      throw new Error('Edge not found in graph');
    }

    // Try to find and end start vertices and delete edge from them.
    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  findEdge(startVertex, endVertex) {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex) {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  getWeight() {
    return this.getAllEdges().reduce((weight, graphEdge: GraphEdge) => {
      return weight + graphEdge.weight;
    }, 0);
  }

  reverse() {
    this.getAllEdges().forEach((edge: GraphEdge) => {
      // Delete straight edge from graph and from vertices.
      this.deleteEdge(edge);

      // Reverse the edge.
      edge.reverse();

      // Add reversed edge back to the graph and its vertices.
      this.addEdge(edge);
    });

    return this;
  }

  getVerticesIndices() {
    const verticesIndices = {};
    this.getAllVertices().forEach((vertex: GraphVertex, index) => {
      verticesIndices[vertex.getKey()] = index;
    });

    return verticesIndices;
  }

  getAdjacencyMatrix() {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    // Init matrix with infinities meaning that there is no ways of
    // getting from one vertex to another yet.
    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity);
    });

    // Fill the columns.
    vertices.forEach((vertex: GraphVertex, vertexIndex) => {
      vertex.getNeighbors().forEach((neighbor) => {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
      });
    });

    return adjacencyMatrix;
  }

  toString() {
    return Object.keys(this.vertices).toString();
  }
}

class LinkedListNode {
  value;
  next;
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

class LinkedList {
  head;
  tail;
  compare;

  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value) {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new LinkedListNode(value);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find({ value, callback }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  fromArray(values) {
    values.forEach(value => this.append(value));

    return this;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString();
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // Store next node.
      nextNode = currNode.next;

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}

class GraphEdge {
  startVertex;
  endVertex;
  weight;

  constructor(startVertex, endVertex, weight = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  getKey() {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  reverse() {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;

    return this;
  }

  toString() {
    return this.getKey();
  }
}

class GraphVertex {
  value;
  edges;

  constructor(value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    const edgeComparator = (edgeA, edgeB) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value;
    this.edges = new LinkedList(edgeComparator);
  }

  addEdge(edge) {
    this.edges.append(edge);

    return this;
  }

  deleteEdge(edge) {
    this.edges.delete(edge);
  }

  getNeighbors() {
    const edges = this.edges.toArray();

    const neighborsConverter = (node) => {
      return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
    };

    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter);
  }

  getEdges() {
    return this.edges.toArray().map(linkedListNode => linkedListNode.value);
  }

  getDegree() {
    return this.edges.toArray().length;
  }

  hasEdge(requiredEdge) {
    const edgeNode = this.edges.find({
      callback: edge => edge === requiredEdge,
    });

    return !!edgeNode;
  }

  hasNeighbor(vertex) {
    const vertexNode = this.edges.find({
      callback: edge => edge.startVertex === vertex || edge.endVertex === vertex,
    });

    return !!vertexNode;
  }

  findEdge(vertex) {
    const edgeFinder = (edge1) => {
      return edge1.startVertex === vertex || edge1.endVertex === vertex;
    };

    const edge = this.edges.find({ callback: edgeFinder });

    return edge ? edge.value : null;
  }

  getKey() {
    return this.value;
  }

  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge));

    return this;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

const DISTANCES = [[0, 3, 5, 6, 1, 2, 3, 4, 5, 2, 3, 4, 5, 6, 9, 8, 5, 8, 9, 8, 7, 6, 7, 8, 9, 8, 8, 9, 4, 5],
[3, 0, 4, 5, 2, 1, 2, 3, 4, 3, 2, 3, 4, 5, 8, 7, 4, 7, 8, 7, 6, 5, 6, 7, 8, 7, 7, 8, 3, 4],
[5, 4, 0, 3, 4, 3, 2, 1, 2, 5, 4, 3, 2, 3, 8, 7, 4, 7, 8, 7, 6, 5, 6, 7, 8, 7, 7, 8, 3, 4],
[6, 5, 3, 0, 5, 4, 3, 2, 1, 6, 5, 4, 3, 2, 9, 8, 5, 8, 9, 8, 7, 6, 7, 8, 9, 8, 8, 9, 4, 5],
[1, 2, 4, 5, 0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 8, 7, 4, 7, 8, 7, 6, 5, 6, 7, 8, 7, 7, 8, 3, 4],
[2, 1, 3, 4, 1, 0, 1, 2, 3, 2, 1, 2, 3, 4, 7, 6, 3, 6, 7, 6, 5, 4, 5, 6, 7, 6, 6, 7, 2, 3],
[3, 2, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 2, 3, 6, 5, 2, 5, 6, 5, 4, 3, 4, 5, 6, 5, 5, 6, 1, 2],
[4, 3, 1, 2, 3, 2, 1, 0, 1, 4, 3, 2, 1, 2, 7, 6, 3, 6, 7, 6, 5, 4, 5, 6, 7, 6, 6, 7, 2, 3],
[5, 4, 2, 1, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 8, 7, 4, 7, 8, 7, 6, 5, 6, 7, 8, 7, 7, 8, 3, 4],
[2, 3, 5, 6, 1, 2, 3, 4, 5, 0, 3, 4, 5, 6, 9, 8, 5, 8, 9, 8, 7, 6, 7, 8, 9, 8, 8, 9, 4, 5],
[3, 2, 4, 5, 2, 1, 2, 3, 4, 3, 0, 3, 4, 5, 8, 7, 4, 7, 8, 7, 6, 5, 6, 7, 8, 7, 7, 8, 3, 4],
[4, 3, 3, 4, 3, 2, 1, 2, 3, 4, 3, 0, 3, 4, 5, 4, 1, 4, 5, 4, 3, 2, 3, 4, 5, 4, 4, 5, 2, 3],
[5, 4, 2, 3, 4, 3, 2, 1, 2, 5, 4, 3, 0, 3, 8, 7, 4, 7, 8, 7, 6, 5, 6, 7, 8, 7, 7, 8, 3, 4],
[6, 5, 3, 2, 5, 4, 3, 2, 1, 6, 5, 4, 3, 0, 9, 8, 5, 8, 9, 8, 7, 6, 7, 8, 9, 8, 8, 9, 4, 5],
[9, 8, 8, 9, 8, 7, 6, 7, 8, 9, 8, 5, 8, 9, 0, 3, 4, 5, 6, 1, 2, 3, 4, 5, 2, 3, 5, 6, 7, 8],
[8, 7, 7, 8, 7, 6, 5, 6, 7, 8, 7, 4, 7, 8, 3, 0, 3, 4, 5, 2, 1, 2, 3, 4, 3, 2, 4, 5, 6, 7],
[5, 4, 4, 5, 4, 3, 2, 3, 4, 5, 4, 1, 4, 5, 4, 3, 0, 3, 4, 3, 2, 1, 2, 3, 4, 3, 3, 4, 3, 4],
[8, 7, 7, 8, 7, 6, 5, 6, 7, 8, 7, 4, 7, 8, 5, 4, 3, 0, 3, 4, 3, 2, 1, 2, 5, 4, 2, 3, 6, 7],
[9, 8, 8, 9, 8, 7, 6, 7, 8, 9, 8, 5, 8, 9, 6, 5, 4, 3, 0, 5, 4, 3, 2, 1, 6, 5, 3, 2, 7, 8],
[8, 7, 7, 8, 7, 6, 5, 6, 7, 8, 7, 4, 7, 8, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 1, 2, 4, 5, 6, 7],
[7, 6, 6, 7, 6, 5, 4, 5, 6, 7, 6, 3, 6, 7, 2, 1, 2, 3, 4, 1, 0, 1, 2, 3, 2, 1, 3, 4, 5, 6],
[6, 5, 5, 6, 5, 4, 3, 4, 5, 6, 5, 2, 5, 6, 3, 2, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 2, 3, 4, 5],
[7, 6, 6, 7, 6, 5, 4, 5, 6, 7, 6, 3, 6, 7, 4, 3, 2, 1, 2, 3, 2, 1, 0, 1, 4, 3, 1, 2, 5, 6],
[8, 7, 7, 8, 7, 6, 5, 6, 7, 8, 7, 4, 7, 8, 5, 4, 3, 2, 1, 4, 3, 2, 1, 0, 5, 4, 2, 1, 6, 7],
[9, 8, 8, 9, 8, 7, 6, 7, 8, 9, 8, 5, 8, 9, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 0, 3, 5, 6, 7, 8],
[8, 7, 7, 8, 7, 6, 5, 6, 7, 8, 7, 4, 7, 8, 3, 2, 3, 4, 5, 2, 1, 2, 3, 4, 3, 0, 4, 5, 6, 7],
[8, 7, 7, 8, 7, 6, 5, 6, 7, 8, 7, 4, 7, 8, 5, 4, 3, 2, 3, 4, 3, 2, 1, 2, 5, 4, 0, 3, 6, 7],
[9, 8, 8, 9, 8, 7, 6, 7, 8, 9, 8, 5, 8, 9, 6, 5, 4, 3, 2, 5, 4, 3, 2, 1, 6, 5, 3, 0, 7, 8],
[4, 3, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 3, 4, 7, 6, 3, 6, 7, 6, 5, 4, 5, 6, 7, 6, 6, 7, 0, 1],
[5, 4, 4, 5, 4, 3, 2, 3, 4, 5, 4, 3, 4, 5, 8, 7, 4, 7, 8, 7, 6, 5, 6, 7, 8, 7, 7, 8, 1, 0]
];

function findAllPaths(startVertex, paths = [], path = []) {
  // Clone path.
  const currentPath = [...path];

  // Add startVertex to the path.
  currentPath.push(startVertex);

  // Generate visited set from path.
  const visitedSet = currentPath.reduce((accumulator, vertex) => {
    const updatedAccumulator = { ...accumulator };
    updatedAccumulator[vertex.getKey()] = vertex;

    return updatedAccumulator;
  }, {});

  // Get all unvisited neighbors of startVertex.
  const unvisitedNeighbors = startVertex.getNeighbors().filter((neighbor) => {
    return !visitedSet[neighbor.getKey()];
  });

  // If there no unvisited neighbors then treat current path as complete and save it.
  if (!unvisitedNeighbors.length) {
    paths.push(currentPath);

    return paths;
  }

  // Go through all the neighbors.
  for (let neighborIndex = 0; neighborIndex < unvisitedNeighbors.length; neighborIndex += 1) {
    const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
    findAllPaths(currentUnvisitedNeighbor, paths, currentPath);
  }

  return paths;
}

function getCycleWeight(adjacencyMatrix, verticesIndices, cycle) {
  let weight = 0;

  for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
    const fromVertex = cycle[cycleIndex - 1];
    const toVertex = cycle[cycleIndex];
    const fromVertexIndex = verticesIndices[fromVertex.getKey()];
    const toVertexIndex = verticesIndices[toVertex.getKey()];
    weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
  }

  return weight;
}

function bfTravellingSalesman(graph) {
  // Pick starting point from where we will traverse the graph.
  const startVertex = graph.getAllVertices()[0];

  // BRUTE FORCE.
  // Generate all possible paths from startVertex.
  const allPossiblePaths = findAllPaths(startVertex);

  // Filter out paths that are not cycles.
  const allPossibleCycles = allPossiblePaths.filter((path) => {
    /** @var {GraphVertex} */
    const lastVertex = path[path.length - 1];
    const lastVertexNeighbors = lastVertex.getNeighbors();

    return lastVertexNeighbors.includes(startVertex);
  });

  // Go through all possible cycles and pick the one with minimum overall tour weight.
  const adjacencyMatrix = graph.getAdjacencyMatrix();
  const verticesIndices = graph.getVerticesIndices();
  let salesmanPath = [];
  let salesmanPathWeight = null;
  for (let cycleIndex = 0; cycleIndex < allPossibleCycles.length; cycleIndex += 1) {
    const currentCycle = allPossibleCycles[cycleIndex];
    const currentCycleWeight = getCycleWeight(adjacencyMatrix, verticesIndices, currentCycle);

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
      salesmanPath = currentCycle;
      salesmanPathWeight = currentCycleWeight;
    }
  }

  // Return the solution.
  return salesmanPath;
}

const LOCATION_MAPPING = {
  'A1.S1.1': 0,
  'A1.S1.2': 1,
  'A1.S1.3': 5,
  'A1.S1.4': 10,
  'A1.S2.1': 2,
  'A1.S2.2': 3,
  'A1.S2.3': 12,
  'A1.S2.4': 13,
};

@Injectable({ providedIn: 'root' })
export class RouteService {

  constructor() { }

  runAlgorithm(route, items: any[]) {

    if (items.length === 1) {
      return items;
    }

    const vertexes: GraphVertex[] = [];
    const edges: GraphEdge[] = [];

    // items.reverse();

    items.forEach((item, index) => {
      const newVertex = new GraphVertex('' + index);
      vertexes.push(newVertex);
      vertexes.slice(0, index).forEach((vertex, index2) => {
        const newVertexLocation = LOCATION_MAPPING[item.location.substr(0, 7)];
        console.log('NEW ITEM LOCATION: ', newVertexLocation);
        const definedVertexLocation = LOCATION_MAPPING[items[vertex.getKey()].location.substr(0, 7)];
        // console.log('DEFINED ITEM LOCATION: ', definedVertexLocation);
        edges.push(new GraphEdge(newVertex, vertex, DISTANCES[newVertexLocation][definedVertexLocation]));
      });
    });

    const graph = new Graph();
    for (const edge of edges) {
      graph.addEdge(edge);
    }

    console.log('ALL VERTICES: ', graph.getAllVertices());

    const salesmanPath = bfTravellingSalesman(graph);
    console.log(salesmanPath);

    const orderedList = [];
    for (const vertex of salesmanPath) {
      orderedList.push(items[vertex.getKey()]);
    }
    return orderedList;
  }

}
