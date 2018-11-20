package io.github.amaan75.cricket.service;

import io.github.amaan75.cricket.dao.TeamDao;
import io.github.amaan75.cricket.dto.TeamDto;

import java.util.List;

public interface MatchService {
    Iterable<TeamDao> saveTeamData(List<TeamDto> teams);
    List<TeamDto> getAllTeams();
    TeamDto getTeamById(Long id);
    TeamDto updateTeamById(Long id, TeamDto team);
    TeamDto addNewTeam(TeamDto team);
    boolean deleteTeamById(Long id);
}
