#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"
#include "time.h"

// WiFi credentials
const char* ssid = "Hakim";
const char* password = "hakim1234";

// Server URL
const char* serverName = "http://192.168.35.222:5000/api/sensor-data"; // Correct server endpoint

// DHT Sensor setup
#define DHTPIN 4 // GPIO for the DHT11
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Sensor Pin Setup
int voltagePin = 34; // GPIO for the voltage sensor
int currentPin = 33; // GPIO for the current sensor
int lightPin = 35;   // GPIO for the light sensor (analog pin)

// Time setup
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 3600; // Adjust according to your time zone
const int daylightOffset_sec = 3600;

void setup() {
  Serial.begin(115200);
  dht.begin();

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connexion au WiFi...");
  }
  Serial.println("Connecté au WiFi");

  // Initialize and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  Serial.println("Synchronisation de l'heure avec le serveur NTP...");
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Erreur de synchronisation de l'heure !");
    return;
  }
  Serial.println("Heure synchronisée avec succès");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Read sensor values
    float voltage = analogRead(voltagePin) * (3.3 / 4095.0); // Convert to voltage
    float current = analogRead(currentPin) * (3.3 / 4095.0); // Convert to current
    float light = analogRead(lightPin) * (3.3 / 4095.0);     // Convert to light intensity
    float temperature = dht.readTemperature();  // Read temperature
    float humidity = dht.readHumidity(); // Read humidity

    // Check for invalid temperature or humidity readings
    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Erreur de lecture du capteur de température ou d'humidité");
      return;
    }

    // Get current time
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
      Serial.println("Erreur de récupération de l'heure actuelle");
      return;
    }
    char timestamp[30];
    strftime(timestamp, sizeof(timestamp), "%Y-%m-%dT%H:%M:%S", &timeinfo);

    // Create the HTTP client to send the data to the server
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    // Build the JSON payload
    String jsonData = "{\"voltage\":" + String(voltage) +
                      ",\"current\":" + String(current) +
                      ",\"temperature\":" + String(temperature) +
                      ",\"humidity\":" + String(humidity) +
                      ",\"light\":" + String(light) +
                      ",\"timestamp\":\"" + String(timestamp) + "\"}";

    // Print data to Serial Monitor
    Serial.print("Envoi des données : ");
    Serial.println(jsonData);

    // Send the POST request
    int httpResponseCode = http.POST(jsonData);

    // Check for the response code
    if (httpResponseCode > 0) {
      Serial.print("Code de réponse HTTP : ");
      Serial.println(httpResponseCode);
      Serial.println("Données envoyées avec succès");
    } else {
      Serial.print("Erreur lors de l'envoi des données : ");
      Serial.println(http.errorToString(httpResponseCode).c_str());
    }

    // End the HTTP request
    http.end();
  }

  delay(10000); // Send data every 10 seconds
}
