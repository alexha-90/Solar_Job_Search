// import React from 'react';
// import store from '../index';
// //================================================================================================//
//
// const openListArr = [];
//
// export default function populateJobList(data, currentPage, urlOpenList) {
//
//
//
//
// function gatherOpenList(event) {
//     if (event.target.checked) {
//         openListArr.push(event.target.value);
//     } else {
//         openListArr.pop();
//     }
//
//     return store.dispatch({
//         type: 'GATHER_URLS_TO_PROPS',
//         payload: openListArr
//     });
// }
//
// function onTriggerMap(job) {
//     store.dispatch({
//         type: 'JOB_LOCATION_TO_PROPS',
//         payload: job
//     });
// }
//
