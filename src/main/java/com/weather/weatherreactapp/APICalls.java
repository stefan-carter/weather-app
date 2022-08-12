package com.weather.weatherreactapp;

import org.apache.http.StatusLine;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

public class APICalls {
    public static void main(String[] args) throws Exception {

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            URIBuilder builder = new URIBuilder("https://api.openweathermap.org/data/2.5/weather/");
            builder.setParameter("q", "London").setParameter("APPID", "008a49876e8a95c5a3ef63eebf8b2fdd");
            final HttpGet get = new HttpGet(builder.build());

            try (CloseableHttpResponse response = httpClient.execute(get)) {
                StatusLine statusLine = response.getStatusLine();
                System.out.println(statusLine.getStatusCode() + " " + statusLine.getReasonPhrase());
                String responseBody = EntityUtils.toString(response.getEntity());
                System.out.println("Response body: " + responseBody);

                parse(builder.toString());
            }
        }
    }

    public static String parse(String responseBody) {
        JSONArray weatherJson = new JSONArray(responseBody);
        for (int i = 0; i < weatherJson.length(); i++) {
            JSONObject weatherDetails = weatherJson.getJSONObject(i);
            int id = weatherDetails.getInt("id");
            int temp = weatherDetails.getInt("temp");
            String description = weatherDetails.getString("weather.weather[0].main");
            System.out.println("Description:" + description);
        }
        return null;
    }

}
