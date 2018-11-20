package io.github.amaan75.cricket.dto.result;

import lombok.Data;

public @Data
class Failure extends Result {
    Failure(int code, String status, Object error) {
        this.code = code;
        this.status = status;
        this.data = error;
    }

    Failure(String status, Object error) {
        this(400, status, error);
    }

    public Failure(Object error) {
        this("ERROR", error);
    }
}
