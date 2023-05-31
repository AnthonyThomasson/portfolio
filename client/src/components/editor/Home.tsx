import './../../styles/Home.css'

function Home(): JSX.Element {
    return (
        <div className="home">
            <div className="mobile-warning">
                Hey! This website looks way cooler on desktop. Check it out!
            </div>
            <div className="download-btn">
                <span className="fa-solid fa-download" />
                <a target="_blank" href="files/Resume_Anthony-Thomasson.pdf">
                    {' '}
                    DOWNLOAD
                </a>
            </div>
            <div className="name-section">
                <div className="last-name">THOMASSON</div>
                <div className="first-name">ANTHONY</div>
            </div>
            <div className="title-section">
                <h3>FULL STACK DEVELOPER</h3>
            </div>
            <div className="summary-section">
                <ul className="links">
                    <li>
                        <span className="fa-solid fa-phone" />
                        +1 (403) 465-0437
                    </li>
                    <li>
                        <span className="fa-solid fa-envelope" />
                        <a href="mailto:athomasson.93@gmail.com">
                            athomasson.93@gmail.com
                        </a>
                    </li>
                    <li>
                        <span className="fa-brands fa-linkedin" />
                        <a href="https://linkedin.com/in/anthony-thomasson-a461606a">
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <span className="fa-brands fa-github" />
                        <a href="https://github.com/anthonythomasson">GitHub</a>
                    </li>
                </ul>
                <div className="summary">
                    <h3>SUMMARY</h3>
                    <p>
                        Passionate developer with a love to learn and a desire
                        to help others. I am motivated to build products that I
                        can be proud of.
                    </p>
                </div>
            </div>
            <div className="main-section">
                <div className="left-content">
                    <div className="education">
                        <h3>EDUCATION</h3>
                        <div className="degree">
                            BA Comp. Information Systems
                        </div>
                        <div className="school">Mount Royal University</div>
                        <div className="location">Calgary, AB</div>
                        <div className="year">2012 - 2016</div>
                    </div>
                    <div className="skills">
                        <h3>SKILLS</h3>
                        <ul>
                            <li>Microservice Architecture</li>
                            <li>Leadership/Mentorship</li>
                            <li>Project Management</li>
                            <li>Domain Driven Development</li>
                            <li>DevOps and CI/CD</li>
                        </ul>
                    </div>
                    <div className="technologies">
                        <h3>TECHNOLOGIES</h3>
                        <div className="languages">
                            <h4>LANGUAGES</h4>
                            <ul>
                                <li>Golang</li>
                                <li>Typescript</li>
                                <li>JavaScript</li>
                                <li>PHP</li>
                            </ul>
                        </div>
                        <div className="frameworks">
                            <h4>FRAMEWORKS</h4>
                            <ul>
                                <li>Vue</li>
                                <li>React</li>
                                <li>Node</li>
                                <li>Express</li>
                            </ul>
                        </div>
                        <div className="db">
                            <h4>INFRASTRUCTURE</h4>
                            <ul>
                                <li>Kafka</li>
                                <li>Kubernetes</li>
                                <li>Docker</li>
                                <li>MySql</li>
                                <li>Postgres</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="right-content">
                    <div className="experience">
                        <h3>EXPERIENCE</h3>
                        <ul>
                            <li>
                                <div className="experience-heading">
                                    Senior Software Developer
                                </div>
                                <div className="experience-body">
                                    <span className="experience-company">
                                        Helcim
                                    </span>
                                    |
                                    <span className="experience-year">
                                        2021 - Present
                                    </span>
                                    <div className="experience-summary">
                                        Working on high level software
                                        initiatives as well as mentoring
                                        developers across the company.
                                    </div>
                                    <ul className="experience-notes">
                                        <li>
                                            Writing and maintaining internal
                                            articles teaching developers on a
                                            wide variety of software concepts.
                                        </li>
                                        <li>
                                            Delivering presentations and
                                            workshops on development tools and
                                            methodologies.
                                        </li>
                                        <li>
                                            Helping teams utilize micro frontend
                                            development strategies utilizing
                                            module federation as a means for
                                            teams to share ui components.
                                        </li>
                                        <li>
                                            Helping teams adopt continuous
                                            delivery deployment strategies using
                                            feature flags and canary releases.
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="experience-heading">
                                    Software Architect
                                </div>
                                <div className="experience-body">
                                    <span className="experience-company">
                                        Helcim
                                    </span>
                                    |
                                    <span className="experience-year">
                                        2019 - 2021
                                    </span>
                                    <div className="experience-summary">
                                        Consulted with development teams to help
                                        with architectural decisions.
                                    </div>
                                    <ul className="experience-notes">
                                        <li>
                                            Performed regular meetings with each
                                            development team discussing
                                            solutions to architectural concerns
                                            they were facing.
                                        </li>
                                        <li>
                                            Built producer/consumer libraries
                                            for Kafka, and worked with teams to
                                            help them integrate event based
                                            architecture within their services.
                                        </li>
                                        <li>
                                            Built and maintained a web framework
                                            inspired by express.js and laravel.
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="experience-heading">
                                    Team Lead - Payments
                                </div>
                                <div className="experience-body">
                                    <span className="experience-company">
                                        Helcim
                                    </span>
                                    |
                                    <span className="experience-year">
                                        2018 - 2019
                                    </span>
                                    <div className="experience-summary">
                                        Led a team of 5 developers to build and
                                        support payment related services.
                                    </div>
                                    <ul className="experience-notes">
                                        <li>
                                            Rebuilt the payments platform from
                                            the ground up into a series of small
                                            testable microservices.
                                        </li>
                                        <li>
                                            Mentored and trained a team of
                                            predominantly junior developers.
                                        </li>
                                        <li>
                                            Worked against fast paced agile
                                            product requirements.
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="experience-heading">
                                    Full Stack Software Developer
                                </div>
                                <div className="experience-body">
                                    <span className="experience-company">
                                        Helcim
                                    </span>
                                    |
                                    <span className="experience-year">
                                        2016 - 2018
                                    </span>
                                    <div className="experience-summary">
                                        Worked as a full stack software
                                        developer on a variety of software
                                        projects.
                                    </div>
                                    <ul className="experience-notes">
                                        <li>
                                            Worked with banks to integrate with
                                            multiple payment gateways.
                                        </li>
                                        <li>
                                            Built an iOS mobile POS system with
                                            integrations with a variety of
                                            different payments devices.
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
