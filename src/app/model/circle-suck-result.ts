import {Team} from './team'
import { CircleOfSuckEdge } from './circle-suck-edge';


export type CircleOfSuckResult = null | {
    circleOfSuck: CircleOfSuckEdge[]
    teams: Team[]
  }