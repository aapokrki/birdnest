# Birdnest

[Link to the web application](https://reaktor-birdnest-aapokrki.netlify.app/)

## Objectives

Most of the objectives have been implemented:

- Persist the pilot information for **10 minutes** since their drone was last seen by the equipment
- Display the closest confirmed distance to the nest
- Contain the pilot name, email address and phone number
- Not require the user to manually refresh the view to see up-to-date information

What wasn't implemented:

- **Immediately** show the information from the last 10 minutes to anyone opening the application

This would require a backend and a separate database to hold pilot and drone data from where the past 10 minutes can be called immediately. The backend would continuously gather data and let go of it after 10 minutes.
The clientside app would then get drone and pilot data from the backend database. The implementation of the backend would be quite simple if I had the time to do so.

I would have implemented this feature using the MEAN stack, since I have knowledge of the MERN stack.

This current implementation does it all in Angular and is hosted on Netlify.

## Thoughts

In addition to being a pre-assignment, I took this project as a learning experience to try out Angular. All-in-all I think that I've learned a great deal from this project and I'm happy I did it even though it's missing a feature :)
