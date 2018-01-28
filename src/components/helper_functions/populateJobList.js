import React from 'react';
//================================================================================================//
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
        <div>
            {jobsArr.map((job) => {
                return (
                    <div className='' key={job[6]}>
                        <div id=''>
                            <span>Posted</span>: {job[1]}
                            <br/>
                            <span>Company</span>: {job[2]}
                            <br/>
                            <span>Title</span>: {job[3]}
                            <br/>
                            <span>Location</span>: {job[4]}
                            <br/>
                            <span>Summary</span>: {job[5]}
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <a href={job[6]}>Link</a>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}


/*
import React from 'react';
//================================================================================================//
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
        <div>
            {jobsArr.map((job) => {
                return (
                    <div className='' key={job[6]}>
                        <div id=''>
                            <span>Posted</span>: {job[1]}
                            <br/>
                            <span>Company</span>: {job[2]}
                            <br/>
                            <span>Title</span>: {job[3]}
                            <br/>
                            <span>Location</span>: {job[4]}
                            <br/>
                            <span>Summary</span>: {job[5]}
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <a href={job[6]}>Link</a>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
 */