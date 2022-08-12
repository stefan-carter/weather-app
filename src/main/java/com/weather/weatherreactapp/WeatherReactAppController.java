package com.weather.weatherreactapp;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherReactAppController {
    private WeatherReactAppRepository repo;

    WeatherReactAppController(WeatherReactAppRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/api/weatherapp")
    public List<Weather> getWeather() {
        System.out.println("Come on!");
        return repo.findAll();
    }

}
