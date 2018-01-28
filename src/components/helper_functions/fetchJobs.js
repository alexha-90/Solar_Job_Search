import axios from 'axios';
import store from '../../index';
//===============================================================================================//

export default function fetchJobs(location, maxDistance, props) {
    // return all USA results if no location selected
    let submittedDistance = maxDistance || '3000';

    return axios.post('/api/fetchJobs', [location, submittedDistance])
        .then(res => {
            // console.log(res);
            if (res.data === 'error') {
                return 'error';
            }
            // dispatch query results to redux store
            props.dispatch(() => {
                store.dispatch({
                    type: 'JOB_LIST_TO_PROPS',
                    payload: res.data
                });
            })
        })
}