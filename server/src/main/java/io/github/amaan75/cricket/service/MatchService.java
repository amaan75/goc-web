package io.github.amaan75.cricket.service;

import io.github.amaan75.cricket.dao.TeamDao;
import io.github.amaan75.cricket.dto.TeamDto;

import java.util.List;

public interface MatchService {
    void saveTeamData(List<TeamDto> teams);

}
