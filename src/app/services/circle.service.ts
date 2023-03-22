import { Injectable } from '@angular/core'
import { Game } from '../model/game'
import { Team } from '../model/team'
import * as _ from 'lodash';
import { GraphService } from './graph.service';
import { WeightedDiGraph } from '../model/graph'


@Injectable({
    providedIn: 'root'
})

export class CircleService {

    constructor(
        private graphService: GraphService
    ) { }

    getCircle(teams: Team[], games: Game[]) {

        // maps winner team -> loser team
        const gameGraph = _.fromPairs(_.map(teams, ({ team }) => [team, [] as string[]]))

        // contains all future games, as [home_team, away_team] pairs
        const futureGames = [] as [string, string][]

        _.each(games, ({home_team, away_team, home_score, away_score }) => {

            if (away_score === null || home_score === null) {
                futureGames.push([home_team, away_team])
            } else if (away_score > home_score) {
                gameGraph[away_team].push(home_team)
            } else {
                gameGraph[home_team].push(away_team)
            }
        })

        const teamToIndex = _.fromPairs(_.map(teams, ({ team }, i) => [team, i]))

        const graph = new WeightedDiGraph(teams.length)
        _.each(gameGraph, (losers, winner) => {
            _.each(losers, (loser) => {
                graph.addEdge(teamToIndex[winner], teamToIndex[loser], 0)
            })
        })
        _.each(futureGames, ([home, away]) => {
            graph.addEdge(teamToIndex[home], teamToIndex[away], 1)
            graph.addEdge(teamToIndex[away], teamToIndex[home], 1)
        })

        const hamiltonian = this.graphService.getHamiltonian(graph)
        if (!hamiltonian) {
            return null
        }

        const circleOfSuck = _.map(hamiltonian.map((v) => teams[v]), (team1, i, arr) => {
            const team2 = arr[i === arr.length - 1 ? 0 : i + 1]

            return {
                from: team1.abbreviation,
                to: team2.abbreviation,
                isPlayed: _.includes(gameGraph[team1.team], team2.team),
            }
        })

        return { circleOfSuck, teams }


    }

}