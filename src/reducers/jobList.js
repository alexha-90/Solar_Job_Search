const jobList = (state = {}, action) => {

    switch (action.type) {
        case 'JOB_LIST_TO_PROPS': {
            console.log(action.payload);
            return action.payload;
        }

        default: {
            return state;
        }
    }

};

export default jobList;