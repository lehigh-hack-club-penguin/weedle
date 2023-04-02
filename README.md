# TEAM NAME - Club Penguin 

## Project Name: Weedle

## Description
Weedle is a gamified social networking website that allows users to track and share invasive species that they find out in the wild. Users can create an account using Google OAuth and are then able to, by pressing the blue `Weedle` button, upload a photo of any of the 50 most invasive species in the USA. Users tag the image with the name of the species and share their location so that the post can be added to Google Maps. Points are assigned to the user based on the rarity of the species within 50 miles of their location. Users are able to compete with each other through the global leaderboard. Radar mode lets you see all of the 50 most invasive species, their description, as well as their frequency map. We believe that the data collected through our app can be shared with organizations and governments tasked with the removal of invasive species, making their jobs easier and less time-consuming.

### Frameworks & Tools
**Bootstrap, React and Gooogle Cloud, Maps, Firebase, and OAuth**

## Impact
Invasive species are often drains on the environment around them. They outcompete the native plants, destroying native flora and fauna. Invasive species suck significant water out of the ground preventing the native plants from completing their natural processes. Additionally, invasive species degrade waterways, harming water quality and limiting recreational opportunities. We believe Weedle will have a big impact on people's understanding of invasive species because they will begin to pay more attention to the ecosystems around them and recognize the harms invasive species cause. In the future, we hope to implement more features including more invasive species & data as well as information on how users can safely remove and dispose of invasive species. This will further promote the push to remove invasive species by allowing everyday people to take care of them rather than just small organizations and governments who likely don't have the time or resources to address the issue properly. 

## Challenges
Throughout the 24 hours, we faced many challenges pertaining to our project. 

By far our biggest issue was gathering the data to display on Google Maps. We found [iNaturalist.org](https://www.inaturalist.org/home) to be incredibly slow and would usually never return a downloadable file. So, we found a different solution through using the [gbif.org](https://www.gbif.org/) API which hosts iNaturalist.org's data. However, this in and of itself was a challenge because we needed to use R to processes and analyze the data. Nevertheless, we were able to download and process **some** of the data (~50 observations per plant). While this data is far less than ~600 million observations available through iNaturalist.org, with more time we would have processed all of the data and displayed it on our Google Maps integration.

Our other big challenge was learning and implementing the Google Maps API. The Maps API was difficult for us to implement because none of the group members had ever used it before. After some research, we began implementing it into our app and quickly discovered that what we had researched was difficult (maybe even impossible) to implement with what we had implemented so far. After some more research, we came across the google-map-react dependency. Using this we were able to implement the map into our app. Using this dependency posed a different challenge, however, we were not able to place the observations onto the map using the library. So, we came up with our own workaround and dynamically placed a pin onto the map.

## Getting the Project Running
Get this project running by simply clicking [this](https://weedle-3f1c5.web.app/) link.

## Citations
Home Picture - Guy Lebreton 

Data - [iNaturalist.org](https://www.inaturalist.org/home)

The problem with invasive species - [maine.gov](https://www.maine.gov/dacf/php/documents/nisaweconomics.pdf)

Google API - [cloud.google.com](https://cloud.google.com/)
