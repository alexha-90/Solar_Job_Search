import React from 'react';
import store from '../index';
//================================================================================================//

const openListArr = [];

export default function populateJobList(data, currentPage, urlOpenList) {
    // console.log(data);

    console.log(urlOpenList);

    if (!Object.keys(data).length) {
        return (
            <tbody>
            <tr>
                <td>
                    Loading...
                </td>
            </tr>
            </tbody>
        )
    }

    const jobsPerPage = 25;
    let currentPageData = data.slice(jobsPerPage * (currentPage-1), currentPage * jobsPerPage);

    // object to array conversion method from https://stackoverflow.com/questions/38824349/convert-object-to-array-in-javascript
    let jobsArr = Object.keys(currentPageData).map(key => {
        // ID = 0, postDate = 1, company = 2, title = 3, location = 4, summary = 5, URL = 6
        return [key, currentPageData[key]['postDate'], currentPageData[key]['company'], currentPageData[key]['title'],
            currentPageData[key]['location'], currentPageData[key]['summary'], currentPageData[key]['url']];
    });

    // console.log(jobsArr);

    return (
        <tbody>
        {jobsArr.map((job) => {
            return (
                <tr key={job[0] + ' - ' + job[6]}>
                    <td>
                        <input
                            // defaultChecked={this.state.contentCategories.includes('Action/Adventure')}
                            onClick={gatherOpenList}
                            id="checkBox"
                            type="checkbox"
                            value={job[6]}/>
                    </td>
                    <td>{job[1]}</td>
                    <td>{job[2]}</td>
                    <td>
                        <a href={job[6]} target="_blank">{job[3]}</a>
                    </td>
                    <td >
                            <span onClick={() => onTriggerMap(job)} id="jobLocation">
                                {job[4]}
                            </span>
                    </td>
                    <td>{job[5].slice(0,80) + '...'}</td>
                </tr>
            )
        })}
        </tbody>
    );
}

function gatherOpenList(event) {
    if (event.target.checked) {
        openListArr.push(event.target.value);
    } else {
        openListArr.pop();
    }

    return store.dispatch({
        type: 'GATHER_URLS_TO_PROPS',
        payload: openListArr
    });
}

function onTriggerMap(job) {
    store.dispatch({
        type: 'JOB_LOCATION_TO_PROPS',
        payload: job
    });
}

