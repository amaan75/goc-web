export const prepareOptions = (teams) => {
    let teamDropDownOptions = [];
    teams.forEach(team => {
        teamDropDownOptions.push({ value: team.id, key: team.id, text: team.name })
    });
    return teamDropDownOptions;
}