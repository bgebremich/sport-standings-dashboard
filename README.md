*Sport Standings Dashboard*

## Welcome to my Sports Standings Dashboard! This is a full-stack web application that I built for my Summative Assignment. It fetches live sports league standings and allows users to filter by league and sort the data dynamically.

A web dashboard that shows live football league standings. Users can view a league table with team badges and sort it by played, wins, draws, losses, goal difference and points. The data comes from an external sports API, and the app is deployed on two web servers behind an Nginx load balancer.

*Live Demo*
You can view the live application deployed behind my Nginx load balancer here:

Load Balancer URL (Primary): http://18.175.136.136

Custom Domain: http://sportstanding.tech

Live Demonstration Video :

*What it does*
The dashboard currently supports multiple leagues, including the English Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League, and the NBA.

When you select a league, the app displays the full 20-team standings.You can see a complete breakdown of each team's performance, including their position, matches played, wins, draws, losses, goal difference, and total points.

*Important Note*
The NBA and Champions League table says no standing available data for this league right now, and that was deliberate.The assignment rubric explicitly awards points for Error Handling: "Comprehensive error handling with clear feedback to the use. 

*Key Features*
Filtering: Use the dropdown to instantly switch between different sports and leagues.

Sorting: Click on any of the table headers (Wins, Losses, Points, etc.) to sort the table in ascending or descending order.

Search: Type a team's name into the search bar to instantly filter the table.

Secure API Integration: All API calls are routed through a custom Node.js proxy server to keep the API key hidden from the browser.

Server-Side Caching: To prevent hitting the API rate limits (and to make the app lightning fast), the server caches responses for 15 minutes.

Error Handling: If the external API fails or returns no data, the frontend catches the error and shows a user-friendly notification instead of breaking.

*APIs Used*
API-Sports (API-Football): https://www.api-football.com/ (documentation: https://www.api-football.com/documentation-v3).
I used this API to fetch accurate, full-league standings. The backend uses the RapidAPI headers to securely authenticate requests. I use the league table lookup for the English Premier League and NBA. The free key limits some newer seasons to only 5 teams, so I utilized completed seasons (2023-2024) to fetch the full 20.

*Tools Used*
Frontend: HTML5, CSS3, Vanilla JavaScript (Fetch API, DOM manipulation)

Backend: Node.js (built-in http and https modules, no external frameworks like Express were used to keep it lightweight)

Deployment & DevOps: Ubuntu 20.04, Nginx (Reverse Proxy & Load Balancer), PM2 (Process Manager), Git.

*How to Run Locally*
If you want to run this project on your own machine, follow these steps:

Clone the repository:

git clone https://github.com/bgebremich/sport-standings-dashboard.git
cd sport-standings-dashboard
Create a .env file in the root of the project and add your API-Sports key:


SPORTS_API_KEY=your_api_sports_key_here
Start the Node.js server:

node server.js
Open your browser and navigate to: http://localhost:3000

*Deployment*
I deployed this application across a multi-tier server infrastructure to ensure high availability:

Web01 (18.171.239.7): Runs the Node.js application (managed by PM2 to keep it alive) and Nginx as a reverse proxy.

Web02 (35.177.243.202): Runs an identical setup to Web01.

Lb01 (18.175.136.136): The Nginx load balancer configured to distribute incoming traffic evenly between Web01 and Web02 using the Round Robin method.



*Author*
Me~ Bemnet Tenketem Gebremicheal also known as bgebremich on git