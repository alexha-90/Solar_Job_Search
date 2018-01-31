import React from 'react';
//================================================================================================//


export default function jobResultsHeadline (jobList, currentPage) {
    // does not display if results have not loaded yet

    const jobsPerPg = 25;

    let currentPg = 1;
    if (currentPage) {
        currentPg = currentPage
    }

    let lowerBound = (currentPg - 1) * jobsPerPg;
    if (lowerBound === 0) {
        lowerBound = 1;
    }
    let upperBound = currentPg * jobsPerPg;

    if (jobList.length) {
        return (
            <div>
                <h3>
                    Displaying {lowerBound + '-' + upperBound + ' of ' + jobList.length} recently posted solar jobs in the area:
                </h3>
            </div>
        )
    }
}