const indeed = require('indeed-scraper');
//===============================================================================================//

module.exports = app => {
    app.post('/api/fetchJobs', async (req, res) => {
        try {
            const location = req.body[0];
            const radius = req.body[1];

            let jobList = {};

            fetchJobs(location, radius)
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



function fetchJobs(location, radius) {
    // search format reference: http://blog.indeed.com/2016/05/25/how-to-use-advanced-resume-search-features-to-find-the-right-candidates/
    const queryOptions = {
        query: 'solar',
        city: location,
        radius: radius,
        // level: 'entry_level',
        // jobType: 'fulltime',
        maxAge: '30',
        sort: 'date',
        limit: '10'
    };
    return indeed.query(queryOptions);
}