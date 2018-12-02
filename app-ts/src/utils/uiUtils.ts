import { Teams, TeamDropdownOptions } from "./types"
export const prepareOptions = (options: Teams): Array<TeamDropdownOptions> => {
    let teamDropDownOptions: Array<TeamDropdownOptions> = [];
    options.forEach(team => {
        teamDropDownOptions.push({ value: team.id, key: team.id, text: team.name });
    });
    return teamDropDownOptions;
}