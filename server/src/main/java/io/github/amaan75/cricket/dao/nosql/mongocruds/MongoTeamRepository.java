package io.github.amaan75.cricket.dao.nosql.mongocruds;

import io.github.amaan75.cricket.dao.nosql.MongoTeam;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoTeamRepository extends MongoRepository<MongoTeam, Long> {
}
