const jobList = (state = {
    jobsList: {},
    locationParam: '',
    maxDistance: '',
    urlOpenList: null,
    locationToLaunch: false,
    currentPage: 1
}, action) => {

    switch (action.type) {
        case 'JOB_LIST_TO_PROPS': {
            // console.log(action.payload);
            return {
                jobsList: action.payload[0],
                locationParam: action.payload[1],
                maxDistance: action.payload[2]
            }
        }

        case 'JOB_LOCATION_TO_PROPS': {
            // console.log(action.payload);
            return {
                ...state
                ,
                locationToLaunch: action.payload
            };
        }

        case 'REMOVE_JOB_LOCATION_PROPS': {
            return {
                ...state
                ,
                locationToLaunch: undefined
            };
        }

        case 'REMOVE_URLS_FROM_PROPS': {
            return {
                ...state
                ,
                urlOpenList: null
            };
        }


        default: {
            return state;
        }
    }

};

export default jobList;