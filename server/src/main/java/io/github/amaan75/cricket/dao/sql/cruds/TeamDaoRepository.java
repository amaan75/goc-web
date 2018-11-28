package io.github.amaan75.cricket.dao.sql.cruds;

import io.github.amaan75.cricket.dao.sql.TeamDao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamDaoRepository extends CrudRepository<TeamDao, Long> {
}
