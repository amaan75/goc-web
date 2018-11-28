package io.github.amaan75.cricket.dao.nosql;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;


public @Data
@NoArgsConstructor
@Document(collection = "CRICKET_TEAM")
class MongoTeam {
    @Id
    private String id;
    private String name;
    private List<MongoPlayer> players;


}
