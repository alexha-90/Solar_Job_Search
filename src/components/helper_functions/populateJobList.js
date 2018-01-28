import React from 'react';
import { Link } from 'react-router-dom';
//================================================================================================//
export default function populateJobList(data) {
    console.log(data);

    // object to array conversion method from https://stackoverflow.com/questions/38824349/convert-object-to-array-in-javascript
    let jobsArr = Object.keys(data).map(key => {
        // 0 = ID, 1 = company, 2 = title, 3 = location, 4 = postDate, 5 = summary, 6 = URL
        return [key, data[key]['company'], data[key]['title'], data[key]['location'],
            data[key]['postDate'], data[key]['summary'], data[key]['url']];
    });
    
    console.log(jobsArr);

    return (
        <div>
            {jobsArr.map((job) => {
                return (
                    <div className='' key={job[6]}>
                        <div id=''>
                            <span>Company</span>: {job[1]}
                            <br/>
                            <span>Title</span>: {job[2]}
                            <br/>
                            <span>Location</span>: {job[3]}
                            <br/>
                            <span>Posted</span>: {job[4]}
                            <br/>
                            <span>Summary</span>: {job[5]}
                            <br/>
                            <br/>
                            <br/>
                            <br/>

                        </div>
                    </div>
                )
            })}
        </div>
    );
}