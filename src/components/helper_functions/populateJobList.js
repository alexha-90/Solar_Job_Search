import React from 'react';
import store from '../../index';

//TO-DO: onhover, load google maps api and show location in modal
//================================================================================================//
const openListArr = [];

export default function populateJobList(data) {
    // console.log(data);

    // object to array conversion method from https://stackoverflow.com/questions/38824349/convert-object-to-array-in-javascript
    let jobsArr = Object.keys(data).map(key => {
        // ID = 0, postDate = 1, company = 2, title = 3, location = 4, summary = 5, URL = 6
        return [key, data[key]['postDate'], data[key]['company'], data[key]['title'],
            data[key]['location'], data[key]['summary'], data[key]['url']];
    });

    // console.log(jobsArr);

    return (
        <tbody>
            {jobsArr.map((job) => {
                return (
                    <tr key={job[6]}>
                        <td>
                            <input onClick={gatherOpenList} id="checkBox" type="checkbox" value={job[6]}/>
                        </td>
                        <td>{job[1]}</td>
                        <td>{job[2]}</td>
                        <td>
                            <a href={job[6]}>{job[3]}</a>
                        </td>
                        <td>{job[4]}</td>
                        <td>{job[5]}</td>
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

    store.dispatch({
        type: 'GATHER_URLS_TO_PROPS',
        payload: openListArr
    });
}