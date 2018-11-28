package io.github.amaan75.cricket.dao.mongo;

import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;

@AllArgsConstructor()
public class MongoTeam {
    @Id
    public String id;
    public String name;

    @Override
    public String toString() {
        return "MongoTeam{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
