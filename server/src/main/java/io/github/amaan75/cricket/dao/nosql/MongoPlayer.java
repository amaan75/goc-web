package io.github.amaan75.cricket.dao.nosql;

import com.mongodb.Mongo;
import io.github.amaan75.cricket.dao.sql.PlayerDao;
import lombok.Data;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

public @Data
@Document(collection = "CRICKET_PLAYER")
class MongoPlayer {
    @Id
    private String id;
    private String name;

    public MongoPlayer() {
    }

    public MongoPlayer(@NotNull PlayerDao playerDao) {
        this.name = playerDao.getPlayerName();
    }
}
