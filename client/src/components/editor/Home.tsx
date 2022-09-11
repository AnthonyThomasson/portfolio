import './../../styles/Home.css'

function Home(): JSX.Element {
    return (
        <div className="home">
            <div className="name-section">
                <div className="first-name">ANTHONY</div>
                <div className="last-name">THOMASSON</div>
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
                        athomasson.93@gmail.com
                    </li>
                    <li>
                        <span className="fa-brands fa-linkedin" />
                        <a href="https://linkedin.com/in/anthony-thomasson">
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
                            <li>System Architecture</li>
                            <li>Leadership</li>
                            <li>Mentorship</li>
                            <li>Project Management</li>
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
                            <h4>DATA</h4>
                            <ul>
                                <li>Kafka</li>
                                <li>MySql/Postgres</li>
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
                                    Team Lead - Auth
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
                                        Led a team to build a secure and easy to
                                        use authentication and authorization
                                        service used by all of the platforms
                                        microservices.
                                    </div>
                                    <ul className="experience-notes">
                                        <li>
                                            Introduced CI/CD pipelines to
                                            automate the development and
                                            deployment operations.
                                        </li>
                                        <li>
                                            Introduced high risk changes without
                                            incident using feature flags and
                                            canary deployments.
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
                                            Worked with leads helping them to
                                            develop well contained modular
                                            services.
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
                                        Led a team to build and support payment
                                        related services.
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
                                    Software Developer
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
                                        Worked as a general software developer.
                                    </div>
                                    <ul className="experience-notes">
                                        <li>
                                            Built the companies original
                                            payments platform.
                                        </li>
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
