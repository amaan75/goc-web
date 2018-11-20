package io.github.amaan75.cricket.dto.result;

import lombok.Data;

public @Data
abstract class Result {
    int code;
    String status;
    Object data;
}
