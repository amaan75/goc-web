package io.github.amaan75.cricket.dao;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "CRICKET_TEAM", schema = "PUBLIC")
public @Data
class TeamDao {

    @Basic
    @Id
    @Column(name = "TEAM_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Basic
    @Column(name = "TEAM_NAME")
    String teamName;


    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            targetEntity = PlayerDao.class,
            orphanRemoval = true,
            mappedBy = "team"
    )
    List<PlayerDao> playerList;


}
