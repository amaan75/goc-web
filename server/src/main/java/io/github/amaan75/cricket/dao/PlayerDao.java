package io.github.amaan75.cricket.dao;

import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name = "CRICKET_PLAYER", schema = "PUBLIC")
public @Data
class PlayerDao {

    @Id
    @Basic
    @Column(name = "PLAYER_ID")
    Long id;

    @Basic
    @Column(name = "PLAYER_NAME")
    String playerName;

    @ManyToOne(
            targetEntity = TeamDao.class,
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name = "TEAM_ID"
    )
    TeamDao team;


}
