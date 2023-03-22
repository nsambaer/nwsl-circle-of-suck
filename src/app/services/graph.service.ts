import { Injectable } from '@angular/core'
import { WeightedDiGraph } from '../model/graph'
import { Maybe } from '../model/typeutils'
import { Path } from '../model/path';
import * as _ from 'lodash';


@Injectable({
    providedIn: 'root'
})

export class GraphService {

    constructor() { }

    getHamiltonian = (graph: WeightedDiGraph): Maybe<number[]> => {
        const START_NODE = 0

        const getHamiltonianFrom = (curr: number, currPath: Path): Path[] => {
            return _.flatMap(graph.allFrom(curr), ({ neighbor, weight }) => {
                if (neighbor === START_NODE && currPath.nodes.length === graph.size) {
                    return [currPath]
                }

                if (_.includes(currPath.nodes, neighbor)) {
                    return []
                }

                return getHamiltonianFrom(neighbor, {
                    nodes: _.concat(currPath.nodes, neighbor),
                    weight: currPath.weight + weight,
                })
            })
        }

        const paths = getHamiltonianFrom(START_NODE, { nodes: [START_NODE], weight: 0 })
        const shortestPath = _.minBy(paths, 'weight')
        if (!shortestPath) {
            return null
        }
        return shortestPath.nodes
    }
}
