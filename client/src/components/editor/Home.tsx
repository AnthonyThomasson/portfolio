import './../../styles/Home.css'

function Home(): JSX.Element {
    return (
        <div className="home">
            <div className="mobile-warning">
                Hey! This website looks way cooler on desktop. Check it out!
            </div>
            <div className="download-btn">
                <span className="fa-solid fa-download" />
                <a target="_blank" href="/files/Resume_Anthony-Thomasson.pdf">
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
                        am proud of.
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
                            <li>Credit Payments</li>
                            <li>ACH/EFT Payments</li>
                            <li>ISO20022 Message Formats</li>
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
                                    Staff Developer
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
                                            Championed the adoption of canary
                                            and blue green deployment strategies
                                            reducing the amount of P1 incidents
                                            by 70%.
                                        </li>
                                        <li>
                                            Improved speed of delivery by 80% on
                                            changes to the signup and dashboard
                                            platforms by leveraging
                                            choreographed workflows with Kafka.
                                        </li>
                                        <li>
                                            Mentors junior and mid-level
                                            engineers, fostering skills in areas
                                            such as system design, clean coding
                                            practices, and testing strategies.
                                        </li>
                                        <li>
                                            Led a migration of 100+ pages from
                                            Vue2 to Vue3 within 4 months,
                                            coordinating cross-team efforts,
                                            resolving compatibility challenges,
                                            and ensuring a seamless transition
                                            with minimal downtime.
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
                                            Worked through a fast paced
                                            development lifecycle to deliver a
                                            fully featured ecommerce platform in
                                            under 3 months during the height of
                                            the 2020 pandemic.
                                        </li>
                                        <li>
                                            Improved queries performance ranging
                                            from 95% to 98% percent improvement
                                            by leveraging CDC techniques to
                                            optimize data structures..
                                        </li>
                                        <li>
                                            Helped guide the team through
                                            successful PCI audits by mentoring
                                            secure coding practices, ensuring
                                            compliance, and addressing gaps with
                                            auditors.
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
                                            Utilized the strangler pattern to
                                            migrate the payments module from an
                                            existing monolith into its own
                                            microservice, resulting in a 60%
                                            improvement to our team&apos;s lead
                                            time to change.
                                        </li>
                                        <li>
                                            Mentored and trained a team of
                                            predominantly junior developers to
                                            deliver a payment service supporting
                                            over 100 million in gross payment
                                            volume per month.
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
                                            Built and maintained a custom web
                                            framework inspired by express.js and
                                            laravel.
                                        </li>
                                        <li>
                                            Worked with banks integrating with
                                            multiple payment gateways, ensuring
                                            compliance through the certification
                                            processes.
                                        </li>
                                        <li>
                                            Built an iOS mobile POS system with
                                            integrations with a variety of
                                            different payments devices and
                                            peripherals.
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
