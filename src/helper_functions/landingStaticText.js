import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
//===============================================================================================//

const landingStaticText = (
    <div>
        <div className='threeHighlightsContainer'>
            <div id="threeHighlights">
                <h1>
                    Solar job searching made easy...
                </h1>
                <Grid className='threeHighlightsGrid'>
                    <Row id='threeHighlightsRow'>
                        <Col lg={4} xs={12} className="blurb-specific">
                            <img alt="blurb-specific-img" src="https://png.icons8.com/dusk/100/000000/natural-food.png"/>
                            <p>
                                This website only displays jobs that are relevant for the solar industry.
                                You don't have to sort through irrelevant results like on typical job boards.
                            </p>
                            <h2 id="smallScreenHeadline">
                                Specific
                            </h2>
                        </Col>
                        <Col lg={4} xs={12} className="blurb-map">
                            <img alt="blurb-map-img" src="https://png.icons8.com/dusk/100/000000/worldwide-location.png" />
                            <p>
                                You can instantly preview a job's location by clicking on an automatically generated
                                link. Great for quick referencing.
                            </p>
                            <h2 id="smallScreenHeadline">
                                Visual
                            </h2>
                        </Col>
                        <Col lg={4} xs={12} className="blurb-efficiency">
                            <img alt="blurb-efficiency" src="https://s3.amazonaws.com/solarjobsearch/efficiencyGear.png" />
                            <p>
                                Job results are posted in table format for easy viewing. You can catalog multiple job
                                listings and open links for each them at the same time!
                            </p>
                            <h2 id="smallScreenHeadline">
                                Efficient
                            </h2>
                        </Col>
                    </Row>
                    <Row id='threeHighlightsRow'>
                        <Col lg={4} xs={12} className="blurb-specific">
                            <h2 id='largerScreenHeadline'>Specific</h2>
                        </Col>
                        <Col lg={4} xs={12} className="blurb-specific">
                            <h2 id='largerScreenHeadline'>Visual</h2>
                        </Col>
                        <Col lg={4} xs={12} className="blurb-specific">
                            <h2 id='largerScreenHeadline'>Efficient</h2>
                        </Col>
                    </Row>
                </Grid>
            </div>
        </div>

        <div id='whySolar'>
            <h1>Why solar?</h1>
            <p>
                Solar employment expanded last year 17 times faster than the total US economy, according to
                an International Renewable Energy Agency report published on Wednesday that cited data from
                the Solar Foundation. Overall, more than 260,000 people work in the solar industry, up by 24% from 2015.
                The solar business has benefited from the falling cost of solar energy and generous federal tax credits
                that make it more affordable for businesses and homeowners to install solar panels.
            </p>
        </div>

        <div className="solarJobTypesDescription">
            <h1>Types of solar jobs</h1>
            <Grid className="jobDescriptionGrid">
                <Row id='jobDescriptionRow'>
                    <Col sm={12} md={5} >
                        <img alt="salesImg" src="https://s3.amazonaws.com/solarjobsearch/salesImg.jpeg"/>
                    </Col>
                    <Col sm={0} md={0} lg={1} />
                    <Col sm={12} md={6} id="jobDescription">
                        <div>
                            <h2>Field / Sales</h2>
                            <p>
                                Roles that engage more with customers. Talk with them to sign up for PV.
                                Go in the field and make sure things are working properly. Being comfortable
                                understanding customer demands and being personalable are essential traits.
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row id='jobDescriptionRow'>
                    <Col lg={0} md={5} id="jobImgSmallOnly">
                        <img alt="engineerImg1" src="https://s3.amazonaws.com/solarjobsearch/engineerImg.jpeg"/>
                    </Col>
                    <Col sm={12} md={6} id="jobDescription">
                        <div>
                            <h2>Design / Engineering</h2>
                            <p>
                                Roles that require deeper technical understanding about how PV works. Technical aspects
                                on where panels should go, their productivity, electrical conduit runs, racking. Roof type
                                and structural considerations.
                            </p>
                        </div>
                    </Col>
                    <Col sm={0} md={0} lg={1} />
                    <Col sm={12} md={5} id="jobImgLargerOnly">
                        <img alt='engineerImg2' src="https://s3.amazonaws.com/solarjobsearch/engineerImg.jpeg"/>
                    </Col>
                </Row>
                <Row id='jobDescriptionRow'>
                    <Col sm={12} md={5}>
                        <img alt='technicianImg' src="https://s3.amazonaws.com/solarjobsearch/installerImg.jpg"/>
                    </Col>
                    <Col sm={0} md={0} lg={1} />
                    <Col sm={12} md={6} id="jobDescription">
                        <div>
                            <h2>Installation / Technician</h2>
                            <p>
                                Hands-on roles that focus with the physical solar panels themselves. Go on-site and
                                use your knowledge to install solar panels and diagnose potential production problems.
                                The rewarding position that lets you physically see the system get interconnected.
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row id='jobDescriptionRow'>
                    <Col lg={0} md={5} id="jobImgSmallOnly">
                        <img alt='pmImg1' src="https://s3.amazonaws.com/solarjobsearch/pmImg.jpeg"/>
                    </Col>
                    <Col sm={12} md={6} id="jobDescription">
                        <div>
                            <h2>Project Management / Analytics</h2>
                            <p>
                                Roles that deal with the logistics, numbers, and business aspects associated with solar. It is
                                up to you to make sure the panels are installed as scheduled with proper inventory. See why
                                panels are producing poorly and make sense of all the dynamic parts involved with a solar system.
                            </p>
                        </div>
                    </Col>
                    <Col sm={0} md={0} lg={1} />
                    <Col sm={12} md={5} id="jobImgLargerOnly">
                        <img alt='pmImg2' src="https://s3.amazonaws.com/solarjobsearch/pmImg.jpeg"/>
                    </Col>
                </Row>
                <Row id='jobDescriptionRow'>
                    <Col sm={12} md={5}>
                        <img alt='csrImg' src="https://s3.amazonaws.com/solarjobsearch/csrImg.jpg"/>
                    </Col>
                    <Col sm={0} md={0} lg={1} />
                    <Col sm={12} md={6} id="jobDescription">
                        <div>
                            <h2>Customer Service</h2>
                            <p>
                                Roles that interact with solar customers to ensure they are happy. Explain referral
                                processes and help customers when things don't go as planned. You should be personable
                                and level-headed.
                            </p>
                        </div>
                    </Col>
                </Row>

            </Grid>
        </div>
    </div>
);

export default landingStaticText;