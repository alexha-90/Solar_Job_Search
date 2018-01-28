const jobList = (state = {
    jobsList: {},
    urlOpenList: null
}, action) => {

    switch (action.type) {
        case 'JOB_LIST_TO_PROPS': {
            // console.log(action.payload);
            return {
                jobsList: action.payload
            }
        }

        case 'GATHER_URLS_TO_PROPS': {
            console.log(action.payload);
            return {
                jobsList: {
                    ...state.jobsList
                },
                urlOpenList: action.payload
            };
        }

        default: {
            return state;
        }
    }

};

export default jobList;