# SolarJobSearch.com

A website for people to find solar jobs. Data is pulled from indeed.com. All job links
route to indeed first, to give affiliate credit and comply with TOS.

## tl;dr: Service for connecting advertisers with content creators (YT, IG, TWTR, SC)

### Live demo: 
TBD (WORK IN PROGRESS!)

## Highlights:
* Specialized job board for solar industry
* Dynamically update results from user actions
* Can dynamically view job location in a modal that is only rendered once
* Can select multiple jobs and open together
* Geolocation, auto complete

## Built with
* React.js
* Redux
* Bootstrap
* CSS (SCSS)
* HTML
* Node.js (Express)


Limitations
* Some summary data does not always populate
* Unable to retrieve data in chunks. Must make large call at once. Limitation of scraper used.

## Notable tools
* indeed-scraper
* Axios + redux-thunk


[x] = addressed, [ ] = work in progress
## Known bugs and issues
- [] Select all jobs does not work
- [] Positioning can be improved for header jumbotron
- [] Header needs work
- [] Need to translate coordinates to city before running
