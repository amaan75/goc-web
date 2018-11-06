package io.github.amaan75.cricket.dto;

import lombok.Data;

import java.util.List;

public @Data
class TeamDto {
    String name;
    List<PlayerDto> players;
}
