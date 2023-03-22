import { Maybe } from './typeutils'
import * as _ from 'lodash';

export class WeightedDiGraph {
    size: number
    adjMatrix: Maybe<number>[][]
  
    constructor(size: number) {
      this.size = size
      this.adjMatrix = _.map(Array(size), () => _.fill(Array(size), null))
    }
  
    addEdge(n1: number, n2: number, weight: number) {
      if (n1 >= this.size || n2 >= this.size) {
        throw new Error('Vertex does not exist')
      }
      this.adjMatrix[n1][n2] = weight
    }
  
    allFrom(n: number): { weight: number; neighbor: number }[] {
      if (n >= this.size) {
        throw new Error('Vertex does not exist')
      }
      return _.compact(this.adjMatrix[n].map((weight, neighbor) =>
        weight === null ? null : { weight, neighbor }
      ))
    }
  }