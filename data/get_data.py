import pandas as pd
import requests
import json

df = pd.read_csv('species.csv')

observations_data = {}
for plant_name in df['plant_name']:
    # Set the URL and parameters for the iNaturalist API request
    url = 'https://api.inaturalist.org/v1/observations'
    params = {'q': plant_name}
    
    # Make the API request and get the JSON data
    response = requests.get(url, params=params)
    data = json.loads(response.text)
    
    # Store the observations data in a dictionary with the plant name as the key
    observations_data[plant_name] = data['results']

with open('observations.json', 'w') as f:
    json.dump(observations_data, f)