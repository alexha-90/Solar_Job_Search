import React from 'react';
//================================================================================================//


export default function jobResultsHeadline (jobList, currentPage, location) {
    // function does not run if results have not loaded yet

    console.log(jobList);


    let jobsPerPg = 25;

    // if (jobList.length !== jobsPerPg) {
    //     jobsPerPg = jobList.length;
    // }

    let currentPg = !currentPage ? 1 : currentPage;

    let headlineLocation = !location ? 'the USA' : location;

    // let lowerBound = (currentPg - 1) * (jobList.length * (currentPg -1));
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