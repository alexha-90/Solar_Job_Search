import React from 'react';
//================================================================================================//


export default function jobResultsHeadline (jobList, currentPage, location) {
    // function does not run if results have not loaded yet

    const jobsPerPg = 25;

    let currentPg = !currentPage ? 1: currentPage;

    let headlineLocation = !location ? 'the USA' : location;

    let lowerBound = (currentPg - 1) * jobsPerPg;
    if (lowerBound === 0) {
        lowerBound = 1;
    }

    let upperBound = currentPg * jobsPerPg;

    if (jobList.length) {
        return (
            <div>
                <h2>
                    Displaying {lowerBound + '-' + upperBound + ' of ' + jobList.length} recently posted
                    <br/>
                    solar jobs in {headlineLocation}:
                </h2>
            </div>
        )
    }
}