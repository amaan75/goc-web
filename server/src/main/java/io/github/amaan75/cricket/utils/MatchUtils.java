package io.github.amaan75.cricket.utils;

import io.github.amaan75.cricket.dao.PlayerDao;
import io.github.amaan75.cricket.dao.TeamDao;
import io.github.amaan75.cricket.dto.PlayerDto;
import io.github.amaan75.cricket.dto.TeamDto;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class MatchUtils {

    @Contract(" -> fail")
    private MatchUtils() {
        throw new AssertionError("don't instantiate only use this for static Methods");
    }


    public static TeamDao fromTeamDto(@NotNull TeamDto teamDto) {
        TeamDao teamDao = new TeamDao();
        if (teamDto.getId() >= 0)
            teamDao.setId(teamDto.getId());
        teamDao.setTeamName(teamDto.getName());
        List<PlayerDao> playerDaoList = new ArrayList<>();
        teamDto.getPlayers().forEach(player -> {
            PlayerDao playerDao = new PlayerDao();
            playerDao.setPlayerName(player.getName());
            if (player.getId() >= 0)
                playerDao.setId(player.getId());
            playerDao.setTeam(teamDao);
            playerDaoList.add(playerDao);
        });
        teamDao.setPlayerList(playerDaoList);
        return teamDao;
    }


    public static List<PlayerDto> fromPlayerDaosList(@NotNull List<PlayerDao> playerList) {
        List<PlayerDto> playerDtos = new ArrayList<>();
        playerList.forEach(player -> playerDtos.add(fromPlayerDao(player)));
        playerDtos.sort(Comparator.comparingLong(PlayerDto::getId));
        return playerDtos;
    }


    public static PlayerDto fromPlayerDao(@NotNull PlayerDao playerDao) {
        PlayerDto playerDto = new PlayerDto();
        playerDto.setId(playerDao.getId());
        playerDto.setName(playerDao.getPlayerName());
        return playerDto;
    }

    public static TeamDto fromTeamDao(@NotNull TeamDao team) {
        TeamDto teamDto = new TeamDto();
        teamDto.setId(team.getId());
        teamDto.setName(team.getTeamName());
        teamDto.setPlayers(fromPlayerDaosList(team.getPlayerList()));
        return teamDto;
    }

    public static TeamDto fromTeamDaoWithoutPlayers(TeamDao team) {
        TeamDto teamDto = new TeamDto();
        teamDto.setName(team.getTeamName());
        teamDto.setId(team.getId());
        return teamDto;
    }
}
