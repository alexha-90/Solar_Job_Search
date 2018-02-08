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
## Known functional bugs and issues
- [x] Select all jobs does not work
- [x] Header needs work
- [x] Translate coordinates to city before running
- [] Upperbound text on job results headline not correct for counts % 25 !==0
- [] Polyfill arr.includes method for IE compatibility. App doesn't work at the moment
- [] Geolocation feature needs a timeout check and warning for Opera and Safari
- [] Location does not work on FireFox even with permission
- [] Dynamic URL generation


## Known visual bugs and issues
- [x] Safari alignment issues on landing page
- [] Safari overlapping distance dropdown menu on resize toggle
- [] Locate 
- [] MS Edge tooltips move elements up and down on hover
- [] Opera and MS Edge glyphicons move out of position
- [] Search inputs don't display right on larger screens
