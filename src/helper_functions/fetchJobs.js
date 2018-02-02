import axios from 'axios';
import store from '../index';
//===============================================================================================//

// Note: query manipulation logic not triggered from landing page route. Default 'solar'
export default function fetchJobs(location, maxDistance, props, query='solar', jobType='fulltime') {

    let submittedQuery;

    const salesKeywords = 'consultant, sales, canvasser, lead, close';
    const engineerKeywords = 'designer, engineer, specialist, developer, research';
    const installerKeywords = 'installer, electrician, journeyman, roof, construction, laborer, foreman';
    const pmKeywords = 'manager, audit, analyst, adviser, operation';
    const csrKeywords = 'representative, customer, phone';

    // query string manipulation logic not triggered from landing page route. Default 'solar'
    if (typeof(query) === 'string') {
        submittedQuery = query;

    } else {
        const paramsBuilder = [];
        if (query.includes('sales')) {
            paramsBuilder.push(salesKeywords.replace(/,/g, ' or'));
        }

        if (query.includes('engineer')) {
            paramsBuilder.push(engineerKeywords.replace(/,/g, ' or'));
        }

        if (query.includes('installer')) {
            paramsBuilder.push(installerKeywords.replace(/,/g, ' or'));
        }

        if (query.includes('pm')) {
            paramsBuilder.push(pmKeywords.replace(/,/g, ' or'));
        }

        if (query.includes('csr')) {
            paramsBuilder.push(csrKeywords.replace(/,/g, ' or'));
        }

        for (let i = 0; i < paramsBuilder.length; i++) {
            paramsBuilder[i]= 'solar AND (' + paramsBuilder[i] + ')';
        }

        // console.log(paramsBuilder);

        submittedQuery = paramsBuilder.join(' or ');

        // case where all filters removed. Default fall-back
        if (!paramsBuilder.length) {
            submittedQuery = 'solar'
        }
    }

    // console.log(submittedQuery);

    let submittedDistance = maxDistance || '3000';

    // return all USA results if no location selected
    return axios.post('/api/fetchJobs', [location, submittedDistance, submittedQuery, jobType])
        .then(res => {
            // console.log(res);
            if (res.data === 'error') {
                return 'error';
            }
            // dispatch query results to redux store
            props.dispatch(() => {
                store.dispatch({
                    type: 'JOB_LIST_TO_PROPS',
                    payload: [res.data, location, submittedDistance]
                });
            })
        })
}