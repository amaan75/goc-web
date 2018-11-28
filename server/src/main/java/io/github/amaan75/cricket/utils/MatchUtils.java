package io.github.amaan75.cricket.utils;

import com.mongodb.Mongo;
import io.github.amaan75.cricket.dao.nosql.MongoPlayer;
import io.github.amaan75.cricket.dao.nosql.MongoTeam;
import io.github.amaan75.cricket.dao.sql.PlayerDao;
import io.github.amaan75.cricket.dao.sql.TeamDao;
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


    private static List<PlayerDto> fromPlayerDaosList(@NotNull List<PlayerDao> playerList) {
        List<PlayerDto> playerDtos = new ArrayList<>();
        playerList.forEach(player -> playerDtos.add(fromPlayerDao(player)));
        playerDtos.sort(Comparator.comparingLong(PlayerDto::getId));
        return playerDtos;
    }

    private static PlayerDto fromPlayerDao(@NotNull PlayerDao playerDao) {
        PlayerDto playerDto = new PlayerDto();
        playerDto.setId(playerDao.getId());
        playerDto.setName(playerDao.getPlayerName());
        return playerDto;
    }

    private static List<MongoPlayer> fromPlayerDaoList(@NotNull List<PlayerDto> playerDtoList) {
        List<MongoPlayer> mongoPlayers = new ArrayList<>();
        playerDtoList.forEach(playerDto -> mongoPlayers.add(mongoPlayerFromPlayerDto(playerDto)));
        return mongoPlayers;

    }

    private static MongoPlayer mongoPlayerFromPlayerDto(@NotNull PlayerDto playerDto) {
        MongoPlayer player = new MongoPlayer();
        player.setName(playerDto.getName());
        return player;
    }

    private static List<PlayerDto> fromMongoPlayerList(@NotNull List<MongoPlayer> mongoPlayers) {
        List<PlayerDto> playerDtos = new ArrayList<>();
        mongoPlayers.forEach(mongoPlayer -> playerDtos.add(fromMongoPlayer(mongoPlayer)));
        return playerDtos;
    }

    private static PlayerDto fromMongoPlayer(@NotNull MongoPlayer mongoPlayer) {
        PlayerDto playerDto = new PlayerDto();
//        playerDto.getId(mongoPlayer.getId());
        playerDto.setName(mongoPlayer.getName());
        return playerDto;
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

    public static TeamDto fromTeamDao(@NotNull TeamDao team) {
        TeamDto teamDto = new TeamDto();
        teamDto.setId(team.getId());
        teamDto.setName(team.getTeamName());
        teamDto.setPlayers(fromPlayerDaosList(team.getPlayerList()));
        return teamDto;
    }

    public static TeamDto fromTeamDaoWithoutPlayers(@NotNull TeamDao team) {
        TeamDto teamDto = new TeamDto();
        teamDto.setName(team.getTeamName());
        teamDto.setId(team.getId());
        return teamDto;
    }

    public static MongoTeam mongoTeamFromTeamDto(@NotNull TeamDto teamDto) {
        MongoTeam mongoTeam = new MongoTeam();
        mongoTeam.setName(teamDto.getName());
        mongoTeam.setPlayers(fromPlayerDaoList(teamDto.getPlayers()));
        return mongoTeam;

    }

    public static TeamDto fromMongoTeam(@NotNull MongoTeam mongoTeam) {
        TeamDto teamDto = new TeamDto();
        teamDto.setName(mongoTeam.getName());
        teamDto.setPlayers(fromMongoPlayerList(mongoTeam.getPlayers()));
        return teamDto;
    }

}
