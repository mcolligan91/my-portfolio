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

			<motion.div {...revealProps} className="education-bio">
				<div className="education-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M12 3L2 8l10 5 8-4.2V16h1.5V8L12 3z"
							fill="currentColor"
						/>
						<path
							d="M6 10.5V15c0 1.8 2.7 3.5 6 3.5s6-1.7 6-3.5v-4.5l-6 3-6-3z"
							fill="currentColor"
							opacity="0.6"
						/>
					</svg>
				</div>
				<p>
					<span className="education-degree">
						B.S. in Sustainability and the Built Environment
					</span>
					, University of Florida — Summa Cum Laude, 2010 - 2015.
				</p>
				<p>
					An interdisciplinary program covering environmental policy, ecology,
					economics, and design — focused on finding sustainable solutions for how
					buildings and communities are planned, constructed, and operated. Read more
					about the{' '}
					<a
						href="https://catalog.ufl.edu/UGRD/colleges-schools/UGDCP/SUB_BSUB_BSUB01/"
						target="_blank"
						rel="noopener noreferrer"
						className="education-link"
					>
						BSSBE program
					</a>
					.
				</p>
			</motion.div>
		</Container>
	);
};

export default Education;