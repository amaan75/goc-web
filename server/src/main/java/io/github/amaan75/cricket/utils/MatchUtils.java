package io.github.amaan75.cricket.utils;

import io.github.amaan75.cricket.dao.PlayerDao;
import io.github.amaan75.cricket.dao.TeamDao;
import io.github.amaan75.cricket.dto.TeamDto;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

public class MatchUtils {

    @Contract(" -> fail")
    private MatchUtils() {
        throw new AssertionError("don't instantiate only use this for static Methods");
    }


    public static TeamDao fromTeamDto(@NotNull TeamDto teamDto) {
        TeamDao teamDao = new TeamDao();
        teamDao.setTeamName(teamDto.getName());
        List<PlayerDao> playerDaoList = new ArrayList<>();
        teamDto.getPlayers().forEach(player -> {
            PlayerDao playerDao = new PlayerDao();
            playerDao.setPlayerName(player.getName());
            playerDao.setTeam(teamDao);
            playerDaoList.add(playerDao);
        });
        teamDao.setPlayerList(playerDaoList);
        return teamDao;
    }
}
