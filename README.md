# Sport Standings Dashboard
A full-stack web application that fetches live sports league standings and allows users to filter by league and sort the data. 

A web dashboard that shows live football league standings. Users can view a league table with team badges and sort it by played, wins, draws, losses, goal difference and points. The data comes from an external sports API, and the app is deployed on two web servers behind an Nginx load balancer.

APIs used
TheSportsDB, free sports data API: https://www.thesportsdb.com/ (documentation: https://www.thesportsdb.com/documentation). I use the league table lookup for the English Premier League. TODO: confirm the endpoint, season behaviour and free-key limits in their docs, and write them here. The free key returned only 5 teams in my testing, which appears to be a limit of the free tier.

*Live Demo*

*   **Load Balancer URL (Primary):** [http://18.175.136.136](http://18.175.136.136)
*   **Custom Domain:** [http://sportstanding.tech/tech](http://http://sportstanding.tech/) 

*Live Demonstation Video*
My link to the video is here. 
