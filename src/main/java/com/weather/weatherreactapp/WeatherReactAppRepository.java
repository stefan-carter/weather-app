package com.weather.weatherreactapp;

import org.springframework.data.jpa.repository.JpaRepository;

interface WeatherReactAppRepository extends JpaRepository<Weather, Integer> {

}
