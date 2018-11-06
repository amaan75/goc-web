package io.github.amaan75.cricket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
public class CricketApplication {

	public static void main(String[] args) {
		SpringApplication.run(CricketApplication.class, args);
	}
}
