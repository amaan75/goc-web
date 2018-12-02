import { RouteType } from "./types";

export const getInitAppState = () => ({
    teams: [
        {
            id: "-1",
            name: "TEAM 1",
        },
        {
            id: "-2",
            name: "TEAM 2"
        }
    ],
    managedTeam: {
        id: "-1",
        name: "team1",
        players: [
            {
                id: "-1",
                name: "a1"
            },
            {
                id: "-1",
                name: "a2"
            },
            {
                id: "-1",
                name: "a3"
            },
            {
                id: "-1",
                name: "a4"
            },
            {
                id: "-1",
                name: "a5"
            },
            {
                id: "-1",
                name: "a6"
            },
            {
                id: "-1",
                name: "a7"
            },
            {
                id: "-1",
                name: "a8"
            },
            {
                id: "-1",
                name: "a9"
            },
            {
                id: "-1",
                name: "a10"
            },
            {
                id: "-1",
                name: "a11"
            }
        ]
    },
    activeItemRoute: "/" as RouteType
})






export const getInitPlayGameState = () => ({
    formFields: {
        team1: "",
        team2: ""
    }
})