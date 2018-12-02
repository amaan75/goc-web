import get from "lodash/get";
import set from "lodash/set";
import {
    TEAM_2_KEY,
    TEAM_1_KEY,
    TEAM_MGMT_DROPDOWN_KEY,
    TEAM_MGMT_STATE_KEY,
    MANAGED_TEAM_KEY,
    ACTIVE_ITEM_KEY
} from "./Constants";


export const setMyState = (state, arr, value) => {
    return set(state, arr, value);
}

export const getMyState = (state, arr, defaultVal) => {
    return get(state, arr, defaultVal)
}
export const getNewTeam = () => ({
    id: -111,
    name: "Team Name",
    players: [
        { id: -8, name: "player 1" },
        { id: -2, name: "player 2" },
        { id: -3, name: "player 3" },
        { id: -4, name: "player 4" },
        { id: -1115, name: "player 5" },
        { id: -1116, name: "player 6" },
        { id: -1117, name: "player 7" },
        { id: -1118, name: "player 8" },
        { id: -1119, name: "player 9" },
        { id: -11110, name: "player 10" },
        { id: -1111111, name: "player 11" }

    ]
});


export const INITIAL_STATE = {
    teams: [{
        id: -1,
        name: "Team 1",
        players: [
            { name: "player 1" },
            { name: "player 2" },
            { name: "player 3" },
            { name: "player 4" },
            { name: "player 5" },
            { name: "player 6" },
            { name: "player 7" },
            { name: "player 8" },
            { name: "player 9" },
            { name: "player 10" },
            { name: "player 11" }

        ]

    }, {
        id: -108,
        name: "Team 2",
        players: [
            { name: "player 1" },
            { name: "player 2" },
            { name: "player 3" },
            { name: "player 4" },
            { name: "player 5" },
            { name: "player 6" },
            { name: "player 7" },
            { name: "player 8" },
            { name: "player 9" },
            { name: "player 10" },
            { name: "player 11" }

        ]
    }],
    playGameState: {
        dropdownStates: {
            [TEAM_1_KEY]: "",
            [TEAM_2_KEY]: "",
            [TEAM_MGMT_DROPDOWN_KEY]: "",
        },

    },
    [TEAM_MGMT_STATE_KEY]: {
        [MANAGED_TEAM_KEY]: {
            id: -111,
            name: "Team Name",
            players: [
                { id: -8, name: "player 1" },
                { id: -2, name: "player 2" },
                { id: -3, name: "player 3" },
                { id: -4, name: "player 4" },
                { id: -1115, name: "player 5" },
                { id: -1116, name: "player 6" },
                { id: -1117, name: "player 7" },
                { id: -1118, name: "player 8" },
                { id: -1119, name: "player 9" },
                { id: -11110, name: "player 10" },
                { id: -1111111, name: "player 11" }

            ]

        },
    },
    [ACTIVE_ITEM_KEY]: "/",
};
