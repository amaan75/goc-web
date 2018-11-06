package io.github.amaan75.cricket.service.impl;

import io.github.amaan75.cricket.dao.TeamDao;
import io.github.amaan75.cricket.dao.cruds.TeamDaoRepository;
import io.github.amaan75.cricket.dto.TeamDto;
import io.github.amaan75.cricket.service.MatchService;
import io.github.amaan75.cricket.utils.MatchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GamesService implements MatchService {

    private final
    TeamDaoRepository teamDaoRepository;

    @Autowired
    public GamesService(TeamDaoRepository teamDaoRepository) {
        this.teamDaoRepository = teamDaoRepository;
    }

    @Override
    public void saveTeamData(List<TeamDto> teams) {
        List<TeamDao> teamDaoList = new ArrayList<>();
        teams.forEach(team -> teamDaoList.add(MatchUtils.fromTeamDto(team)));
        teamDaoRepository.saveAll(teamDaoList);
    }
}
