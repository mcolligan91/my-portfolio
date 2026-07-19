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
				<p>
					I&apos;m a Senior Software Engineer who spends most of my time building React
					interfaces, but a good chunk of my background is on the other side of the
					screen too — writing Python and SQL to automate data processing and build ETL
					pipelines.
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
					, where I take on independent web development and data software projects
					outside of my full-time work.
				</p>
				<p>
					My academic background is in sustainability and the built environment, which
					shapes how I approach problems: I like understanding the whole system before I
					start building any one part of it. Whether it&apos;s a UI a user touches
					directly or a script quietly processing data behind the scenes, I care about
					the same things — reliability, clarity, and building something that actually
					holds up.
				</p>
			</motion.div>
		</Container>
	);
};

export default About;