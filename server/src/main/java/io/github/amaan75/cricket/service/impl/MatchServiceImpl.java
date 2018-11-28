package io.github.amaan75.cricket.service.impl;

import io.github.amaan75.cricket.dao.nosql.MongoTeam;
import io.github.amaan75.cricket.dao.nosql.mongocruds.MongoTeamRepository;
import io.github.amaan75.cricket.dao.sql.TeamDao;
import io.github.amaan75.cricket.dao.sql.cruds.TeamDaoRepository;
import io.github.amaan75.cricket.dto.TeamDto;
import io.github.amaan75.cricket.service.MatchService;
import io.github.amaan75.cricket.utils.MatchUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static io.github.amaan75.cricket.utils.MatchUtils.*;

@Service
public class MatchServiceImpl implements MatchService {

    private final
    TeamDaoRepository teamDaoRepository;

    private final
    MongoTeamRepository mongoTeamRepository;

    @Autowired
    public MatchServiceImpl(TeamDaoRepository teamDaoRepository, MongoTeamRepository mongoTeamRepository) {
        this.teamDaoRepository = teamDaoRepository;
        this.mongoTeamRepository = mongoTeamRepository;
    }

    @Override
    public Iterable<TeamDao> saveTeamData(List<TeamDto> teams) {
        List<TeamDao> teamDaoList = new ArrayList<>();
        teams.forEach(team -> teamDaoList.add(MatchUtils.fromTeamDto(team)));
        return teamDaoRepository.saveAll(teamDaoList);
    }

    @Override
    public List<TeamDto> getAllTeams() {
        List<TeamDao> teamDaos = (List<TeamDao>) teamDaoRepository.findAll();
        List<TeamDto> teamDtoList = new ArrayList<>();
        teamDaos.forEach(team -> teamDtoList.add(MatchUtils.fromTeamDaoWithoutPlayers(team)));
        teamDtoList.sort(Comparator.comparingLong(TeamDto::getId));
        return teamDtoList;
    }

    @Override
    public TeamDto getTeamById(Long id) {
        if (id != null) {
            Optional<TeamDao> teamDao = teamDaoRepository.findById(id);
            if (teamDao.isPresent())
                return fromTeamDao(teamDao.get());
        }
        return null;
    }

    @Override
    public TeamDto updateTeamById(Long id, TeamDto team) {
        return fromTeamDao(teamDaoRepository.save(fromTeamDto(team)));
    }

    @Override
    public TeamDto addNewTeam(TeamDto team) {
        return fromTeamDao(teamDaoRepository.save(fromTeamDto(team)));
    }

    @Override
    public TeamDto addNewTeamToMongo(TeamDto teamDto) {
        return fromMongoTeam(mongoTeamRepository.save(mongoTeamFromTeamDto(teamDto)));
    }

    @Override
    public boolean deleteTeamById(Long id) {
        teamDaoRepository.deleteById(id);
        return !teamDaoRepository.existsById(id);
    }
}
