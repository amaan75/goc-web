import { DropdownProps } from "semantic-ui-react";


type EntityId = number | string;

export type Team = {
    id: EntityId;
    name: string;
    players?: Array<Player>;
}

interface Player {
    id: EntityId;
    name: string;
}

interface FormFields {
    team1: EntityId;
    team2: EntityId;
    [dropdownkey: string]: EntityId;
}

export type RouteType = "/" | "/teamsMgMt";

export type Teams = Array<Team>;

export interface AppState {
    teams: Teams;
    managedTeam: Team;
    activeItemRoute: RouteType;

}

export interface PlayGameProps {
    teams: Teams
}

export interface TeamDropdownOptions {
    value: EntityId,
    key: EntityId,
    text: string,
}

export interface PlayGameDropdownOptionType extends DropdownProps {
    name: string
}


export interface PlayGameState {
    formFields: FormFields
}


export type TeamKey = "team1" | "team2";