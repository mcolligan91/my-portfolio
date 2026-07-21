import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';
import './Education.scss';

const revealProps = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.4 },
	transition: { duration: 0.8 },
};

const Education = () => {
	return (
		<Container as="section" id="education-content" className="education-section">
			<SectionHeader number="03" title="Education" />

			<motion.div {...revealProps} className="education-content">
				<div className="education-header">
					<span className="education-label">Bachelor of Science</span>

					<h3 className="education-degree">
						Sustainability and the Built Environment
					</h3>

					<div className="education-meta">
						<span className="education-school">
							University of Florida
						</span>

						<span className="education-separator">•</span>

						<span className="education-years">
							2010 - 2015
						</span>

						<span className="education-separator">•</span>

						<span className="education-honors">
							Summa Cum Laude
						</span>
					</div>
				</div>

				<div className="education-divider" />

				<p>
					An interdisciplinary degree that combined environmental science,
					economics, public policy, and design to explore how buildings,
					infrastructure, and communities function as interconnected systems.
					The program emphasized balancing technical, environmental, and human
					considerations to solve complex real-world problems.
				</p>

				<p>
					Although my career ultimately led me into software engineering, the
					systems-thinking mindset I developed at the University of Florida continues to shape
					the way I approach technology. Whether designing a web application,
					architecting a data pipeline, or automating business processes, I
					strive to understand the broader system before optimizing any
					individual component.
				</p>

				<a
					href="https://catalog.ufl.edu/UGRD/colleges-schools/UGDCP/SUB_BSUB_BSUB01/"
					target="_blank"
					rel="noopener noreferrer"
					className="education-link"
				>
					Read more about the BSSBE program →
				</a>
			</motion.div>
		</Container>
	);
};

export default Education;