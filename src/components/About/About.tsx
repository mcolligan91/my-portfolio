import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';
import './About.scss';

const revealProps = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.4 },
	transition: { duration: 0.8 },
};

const About = () => {
	return (
		<Container as="section" id="skills-content" className="about-section">
			<SectionHeader number="01" title="About" />

			<motion.div {...revealProps} className="about-bio">
				<p className="about-greeting">
					Hi, I&apos;m <span className="about-highlight">Michael Colligan</span>.
				</p>
				<p>
					I'm a Senior Software Engineer with a focus on building software that's fast, reliable, and built to last. While much of my work has centered on front-end development, I also design data pipelines, automate business processes, and build the systems that power modern applications.
				</p>
				<p>
					I&apos;m also the founder of{' '}
					<a
						href="https://www.colligantechsolutions.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="about-link"
					>
						Colligan Tech Solutions LLC
					</a>
					, where I take on independent software engineering projects. Whether it's building a web application, streamlining a business process through automation, or developing data pipelines and integrations, I enjoy solving complex technical problems with practical, maintainable solutions.
				</p>
				<p>
					Throughout my career, I've worked across sustainability, healthcare, insurance, and other industries, collaborating with cross-functional teams to deliver software that solves real business problems. My background in sustainable building construction me to think in systems - an approach I still bring to every project today. Whether I'm refining a user interface or architecting a backend workflow, I focus on building solutions that are maintainable, reliable, and genuinely useful.
				</p>
			</motion.div>
		</Container>
	);
};

export default About;