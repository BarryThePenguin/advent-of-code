import { frequency } from '../frequency.js'
import { rangeFill } from '../range.js'

function maxKey<K, V>(map: Map<K, V>) {
  let max = 0
  
  for (let key of map.keys()) {
    if (typeof key === 'string') {
      max = Math.max(max, parseInt(key, 10))
    }
    
    if (typeof key === 'number') {
      max = Math.max(max, key)
    }
  }
  
  return max
}

class SubPosition {
  positions: Map<string, number>
  
  constructor(input: string[]) {
    this.positions = frequency(input)
  }
  
  get cost() {
    let cost = new Map()
    
    for (let position of this.positions.keys()) {
      let fuelCost = 0
      const pos = parseInt(position, 10)
      
      for (let [distance, count] of this.positions) {
        const dis = parseInt(distance, 10)
        fuelCost += Math.abs((dis - pos)) * count
      }
      
      cost.set(position, fuelCost)
    }
    
    return cost
  }
  
  get compoundCost() {
    let cost = new Map()
    let moveCost = new Map()
    
    const maxPosition = maxKey(this.positions)
    
    for (let position of rangeFill(1, maxPosition)) {
      let fuelCost = 0
      
      for (let [distance, count] of this.positions) {
        const dis = parseInt(distance, 10)
        const moves = Math.abs((dis - position))
        
        if (!moveCost.has(moves)) {
          let cost = 0
          
          for (let unit of rangeFill(1, moves)) {
            cost = (cost + unit)
          }
          
          moveCost.set(moves, cost)
        }
        
        fuelCost += moveCost.get(moves) * count
      }
      
      cost.set(position, fuelCost)
    }
    
    return cost
  }
}

export const partOne = (input: string[]) => {
  const positions = new SubPosition(input)

  return Math.min(...positions.cost.values())
}

export const partTwo = (input: string[]) => {
  const positions = new SubPosition(input)
  
  return Math.min(...positions.compoundCost.values())
}