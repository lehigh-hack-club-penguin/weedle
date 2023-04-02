import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Data {

    public static void main(String[] args) {
        try (
            BufferedReader reader = Files.newBufferedReader(Paths.get("species.csv"));
        ) {
            String line;
            while ((line = reader.readLine()) != null) {
                String plantName = line.trim();

                // Make the API request to iNaturalist API
                URL url = new URL("https://api.inaturalist.org/v1/observations?q=" + plantName);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");

                // Parse the JSON response and store the observations data in a JSON file
                InputStream responseStream = connection.getInputStream();
                InputStreamReader responseReader = new InputStreamReader(responseStream, StandardCharsets.UTF_8);
                StringBuilder responseBuilder = new StringBuilder();
                int responseChar;
                while ((responseChar = responseReader.read()) != -1) {
                    responseBuilder.append((char) responseChar);
                }
                responseReader.close();
                responseStream.close();

                JSONArray observations = new JSONObject(responseBuilder.toString()).getJSONArray("results");
                FileWriter file = new FileWriter(plantName + ".json");
                file.write(observations.toString());
                file.flush();
                file.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
