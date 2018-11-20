package io.github.amaan75.cricket.dto.result;

import lombok.Data;

public @Data
class Success extends Result {
    public Success(Object data) {
        this("OK", data);
    }

    public Success(String status, Object data) {
        this.code = 200;
        this.status = status;
        this.data = data;
    }
}
