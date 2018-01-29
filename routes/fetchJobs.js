const indeed = require('indeed-scraper');
//===============================================================================================//

module.exports = app => {
    app.post('/api/fetchJobs', async (req, res) => {
        try {
            console.log(req.body);
            const location = req.body[0];
            const radius = req.body[1];
            const query = req.body[2];
            const jobType = req.body[3];

            let jobList = {};
            fetchJobs(location, radius, query, jobType)
                .then(res => {
                    console.log(res);
                    jobList = res;
                })
                .then(() => {
                    if (jobList.length < 2) {
                        return res.send('error');
                    }
                    res.send(jobList);
                });
        } catch (err) {
            console.log('Error occurred. Unable to obtain list of jobs. Reason: ' + err);
            res.send('error'); // status code return breaks client flow
        }
    });
};



function fetchJobs(location, radius, query, jobType) {
    // search format reference: http://blog.indeed.com/2016/05/25/how-to-use-advanced-resume-search-features-to-find-the-right-candidates/
    const queryOptions = {
        query: query,
        city: location,
        radius: radius,
        jobType: jobType,
        maxAge: '30',
        sort: 'date',
        limit: '100'
    };

    return indeed.query(queryOptions)
        .then(res => {
            return res;
        });
}