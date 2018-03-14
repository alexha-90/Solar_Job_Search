# SolarJobSearch.com
A job searching website tailored specifically for the solar industry. 
Users can specify search radius and filter roles as desired. 
Data is obtained from indeed.com. 

## Live link: 
https://www.solarjobsearch.com/

# Table of contents
* [Why this project](#why)
* [How to use](#howTo)
* [Highlights](#highlights)
* [Limitations](#limitations)
* [Built with](#builtWith)
* [Notable tools](#notableTools)
* [Known functional bugs](#knownFunctionalBugs)
* [Known visual bugs](#knownVisualBugs)
* [Screenshots](#screenshots)
* [License](#license)


<a name="why"></a>
## Why this project:
When I worked in the solar industry, I found it difficult to find positions 
that were relevant to my particular skillset. Even the most popular online 
job boards displayed tons of irrelevant results and nested bothersome 
advertisements. To date, no job board (that I know of) offers the option to 
open multiple links simultaneously or the ability preview the location of the 
job. I created a specialized job board to address all the aforementioned problems.

<a name="howTo"></a>
### How to use this website:
1. Input your desired search location (or leave blank to search in middle of US)
2. Input your desired search radius (or leave blank to search entire country)
3. Click 'Search for solar jobs!' and wait a few moments for results to load
4. Results are displayed in increments of 25. Click on a page number below the results to step forward or backward
5. Your original inputs for location and radius auto populate on the results page. Change them to retrieve new results
6. Job roles can be filtered by selecting desired checkboxes. Results update automatically.
7. Job type can be filtered by selecting the desired radio button. Results update automatically.

<a name="highlights"></a>
## Highlights:
* Responsive design is mobile and tablet friendly
* Checkbox system to select and open multiple job listings at once
* Instantly fetch up to 250 job results from indeed.com
* Dynamic map preview option available for every job result
* Partial page uploading system
* Cyclic news feed on home page
* Location auto-complete
* Cross-browser compatible (more extensive testing can be done)

<a name="limitations"></a>
## Limitations
* Job description does not populate correctly sometimes
* Unable to fetch job results in chunks. Must make large call at once. Limitation of scraper used.
* News feed results could be more optimized 

<a name="builtWith"></a>
## Built with
* React.js
* Redux
* Bootstrap
* CSS (SCSS)
* HTML
* Node.js (Express)

<a name="notableTools"></a>
## Notable tools
* indeed-scraper
* Axios + redux-thunk
* NewsAPI
* Google Analytics

<a name="knownFunctionalBugs"></a>
## Known functional bugs and issues
- ~~Select all jobs does not work~~
- ~~Header needs work~~
- ~~Translate coordinates to city before running~~
- ~~Unnecessary and laggy auto fetch on location update. Add button~~
- ~~Dynamic URL generation with history~~
- ~~Polyfill arr.includes method for IE compatibility. App doesn't work at the moment~~
- ~~HTTPS redirect from www.solarjobsearch.com. (note: OK without www)~~
- Upperbound text on job results headline not correct for counts % 25 !==0
- Geolocation feature needs a timeout check and warning for Opera and Safari
- Location does not work on FireFox even with permission

<a name="knownVisualBugs"></a>
## Known visual bugs and issues
- ~~Safari alignment issues on landing page~~
- ~~Search inputs spacing gets strange for very large screen/high resolutions~~
- ~~Opera and MS Edge glyphicons move out of position~~
- ~~Safari overlapping distance dropdown menu on resize toggle~~
- MS Edge tooltips move elements up and down on hover

<a name="screenshots"></a>
## Screenshots
<img align="middle" alt='homepage' width='400' src='https://alexha.io/images/landingJumbo_SS.png' />

<img align="middle" alt='homepageCont' width='400' src='https://alexha.io/images/landing_info_SS.png' />

<img align="middle" alt='homepage' width='400' src='https://alexha.io/images/results_SS.png' />

<a name="license"></a>
## License
 * Copyright (C) 2018 Alex Ha
 * Please reference the license in the license.txt file