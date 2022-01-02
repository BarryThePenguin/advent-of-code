type Point = `${number},${number}`

type Coordinates = Map<Point, number>

function parseSegment(segment: string, includeDiagonal: boolean) {
  const [start, end] = segment.split(' -> ')
  const coordinates: Coordinates = new Map()
  
  let [x1,y1] = start.split(',').map((num) => parseInt(num, 10))
  let [x2,y2] = end.split(',').map((num) => parseInt(num, 10))
  
  if (includeDiagonal === false && x1 !== x2 && y1 !== y2) {
    return coordinates
  }
  
  coordinates.set(`${x1},${y1}`, 1)
  
  if (x1 !== x2 && y1 !== y2) {
    while (x1 !== x2 && y1 !== y2) {
      if (x1 > x2) {
        x1-=1
      } else {
        x1+=1
      }
      
      if (y1 > y2) {
        y1-=1
      } else {
        y1+=1
      }
      
      coordinates.set(`${x1},${y1}`, 1)
    }
  } else {
    while (x1 !== x2 || y1 !== y2) {
      if (x1 > x2) {
        x1-=1
      } else if (x1 < x2) {
        x1+=1
      } else if (y1 > y2) {
        y1-=1
      } else if (y1 < y2) {
        y1+=1
      }
      
      coordinates.set(`${x1},${y1}`, 1)
    }
  }
    
  return coordinates
}

class Hydrothermal {
  coordinates: Coordinates = new Map()
  
  get overlapCount() {
    let overlapCount = 0
    
    for (let count of this.coordinates.values()) {
        if (count>1) {
          overlapCount += 1
        }
    }
    
    return overlapCount
  }
  
  constructor(segments: string[], includeDiagonal = false) {
    for (let segment of segments) {
      const coordinates = parseSegment(segment, includeDiagonal)
      
      for (let [point, count] of coordinates) {
        const current = this.coordinates.get(point) ?? 0
        this.coordinates.set(point, current + count)
      }
    }    
  }
}

export const partOne = (input: string[]) => {
  const vents = new Hydrothermal(input)
  
  return vents.overlapCount
}

export const partTwo = (input: string[]) => {
  const vents = new Hydrothermal(input, true)
  
  return vents.overlapCount
}