const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function walk(maze: string[], wall: string, current: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
  //1.1 Base case of the map
  if (current.x < 0 || current.x >= maze[0].length || current.y < 0 || current.y >= maze.length) {
    return false;
  }

  //1.2 Base case on a wall
  if (maze[current.y][current.x] === wall) {
    return false;
  }

  //1.3 Base case got to the end
  if (current.x === end.x && current.y === end.y) {
    path.push(end);
    return true;
  }

  //1.4 Base case path seen
  if (seen[current.y][current.x]) {
    return false;
  }

  //Pre condition
  seen[current.y][current.x] = true;
  path.push(current);

  //Recursion
  for (let i = 0; i < dir.length; ++i) {
    const [x, y] = dir[i];
    if (walk(maze, wall, { x: current.x + x, y: current.y + y }, end, seen, path)) {
      return true;
    }
  }

  //Post case
  path.pop();

  return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);

  return path;
}
