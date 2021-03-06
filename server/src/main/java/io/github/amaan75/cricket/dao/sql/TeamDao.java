package io.github.amaan75.cricket.dao.sql;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "CRICKET_TEAM", schema = "PUBLIC")
public @Data
class TeamDao {

    @Basic
    @Column(name = "TEAM_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
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
