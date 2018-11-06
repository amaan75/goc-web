package io.github.amaan75.cricket.controller;

import io.github.amaan75.cricket.dto.TeamDto;
import io.github.amaan75.cricket.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import io.github.amaan75.cricket.utils.MatchUtils;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000"})
public
class GameController {

    private static final String SAVE_TEAM_DATA = "saveTeamData";
    private static final String TEST_ROUTE = "test";

    private final
    MatchService matchService;

    @Autowired
    public GameController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/" + TEST_ROUTE)
    public String test() {
        return "{\n" +
                "  \"status\":\"200\",\n" +
                "  \"resultMessage\":\"server is running :D!\"\n" +
                "}";
    }

    @PostMapping(value = "/" + SAVE_TEAM_DATA,
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE,
                    MediaType.TEXT_PLAIN_VALUE})
    public void saveTeamData(@RequestBody TeamDto[] teams) {
        System.out.println("list of teams found," + teams);
        matchService.saveTeamData(Arrays.asList(teams));
    }
}
