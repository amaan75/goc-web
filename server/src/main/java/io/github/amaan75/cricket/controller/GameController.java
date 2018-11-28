package io.github.amaan75.cricket.controller;

import io.github.amaan75.cricket.dto.TeamDto;
import io.github.amaan75.cricket.dto.result.Failure;
import io.github.amaan75.cricket.dto.result.Result;
import io.github.amaan75.cricket.dto.result.Success;
import io.github.amaan75.cricket.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {CorsConfiguration.ALL})
public
class GameController {

    private static final String SAVE_TEAM_DATA = "saveTeamData";
    private static final String TEST_ROUTE = "test";
    private static final String GET_ALL_TEAMS = "getAllTeams";
    private static final String GET_TEAM_BY_ID = "getTeamById";
    private static final String UPDATE_TEAM_BY_ID = "updateTeamById";
    private static final String ADD_NEW_TEAM = "addNewTeam";
    private static final String DELETE_TEAM_BY_ID = "deleteTeamById";

    private final
    MatchService matchService;

    @Autowired
    public GameController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/" + TEST_ROUTE)
    public Result test() {
        //noinspection JsonStandardCompliance
        return new Success("THE SERVER IS UP AND RUNNING");
    }

    @PostMapping(value = "/" + SAVE_TEAM_DATA,
            consumes = {
                    MediaType.APPLICATION_JSON_UTF8_VALUE,
                    MediaType.TEXT_PLAIN_VALUE
            })
    public Result saveTeamData(@RequestBody TeamDto[] teams) {
        //noinspection JsonStandardCompliance
        return matchService.saveTeamData(Arrays.asList(teams)) != null ?
                new Success("DATA SAVED") :
                new Failure("DATA SAVING FAILED");
    }

    @PostMapping("/" + ADD_NEW_TEAM + "/{dbName}")
    public Result addNewTeam(@RequestBody TeamDto team, @PathVariable(required = false) String dbName) {
        TeamDto entity;
        if (dbName.equals("mongo"))
            entity = matchService.addNewTeamToMongo(team);
        else
            entity = matchService.addNewTeam(team);
        return entity != null ? new Success(entity) : new Failure("COULDN'T ADD THE TEAM");
    }

    @PutMapping(value = "/" + UPDATE_TEAM_BY_ID + "/{id}")
    public Result updateTeamById(@PathVariable Long id, @RequestBody TeamDto team) {
        TeamDto entity = matchService.updateTeamById(id, team);
        return entity != null ? new Success(entity) : new Failure("COULDN'T SAVE DATA");
    }

    @GetMapping(value = "/" + GET_ALL_TEAMS)
    public Result getAllTeam() {
        List<TeamDto> entityList = matchService.getAllTeams();
        return entityList != null ? new Success(entityList) : new Failure("COULDN'T FETCH DATA");
    }

    @GetMapping(value = "/" + GET_TEAM_BY_ID + "/{id}")
    public Result getTeamById(@PathVariable Long id) {
        TeamDto entity = matchService.getTeamById(id);
        return entity != null ? new Success(entity) : new Failure("COULDN'T FETCH DATA");
    }


    @DeleteMapping(value = "/" + DELETE_TEAM_BY_ID + "/{id}")
    public Result deleteTeamById(@PathVariable Long id) {
        return matchService.deleteTeamById(id) ? new Success("DELETED", "OBJECT DELETED WITH ID" + id) : new Failure("FAILED TO DELETE");
    }
}
