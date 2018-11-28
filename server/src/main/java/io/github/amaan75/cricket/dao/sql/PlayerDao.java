package io.github.amaan75.cricket.dao.sql;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;


@Entity
@Table(name = "CRICKET_PLAYER", schema = "PUBLIC")
public @Data
class PlayerDao {

    @Id
    @Basic
    @Column(name = "PLAYER_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Basic
    @Column(name = "PLAYER_NAME")
    String playerName;

    @ManyToOne(targetEntity = TeamDao.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "TEAM_ID")
    TeamDao team;


}
