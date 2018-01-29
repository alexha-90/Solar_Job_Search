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
                    jobList = res;
                });

            setTimeout(() => {
                console.log(jobList);
                if (jobList.length < 1) {
                    return res.send('error');
                }
                return res.send(jobList);
            }, 2000);
        } catch (err) {
            console.log('Error occurred. Unable to obtain list of jobs. Reason: ' + err);
            res.send('error'); // status code return breaks client flow
        }
    });
};



function fetchJobs(location, radius, query, jobType) {
    // search format reference: http://blog.indeed.com/2016/05/25/how-to-use-advanced-resume-search-features-to-find-the-right-candidates/
    // fulltime, contract, parttime, temporary, internship, commission

    const queryOptions = {
        query: query,
        city: location,
        radius: radius,
        jobType: jobType,
        maxAge: '30',
        sort: 'date',
        limit: '20'
    };
    return indeed.query(queryOptions);
}