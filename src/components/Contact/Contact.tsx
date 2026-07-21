import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from '../../constants/contactLinks';
import './Contact.scss';

const revealProps = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.4 },
	transition: { duration: 0.8 },
};

const Contact = () => {
	return (
		<Container as="section" id="contact-content" className="contact-section">
			<SectionHeader number="04" title="Contact" />

			<motion.div {...revealProps} className="contact-content">
				<h3 className="contact-heading">Get in touch</h3>

				<p className="contact-intro">
					Need help modernizing an application, automating a workflow, or building a
					custom software solution? I&apos;d love to hear about your project. I&apos;m
					currently open to full-time engineering roles as well as consulting
					engagements through{' '}
					<a
						href="https://www.colligantechsolutions.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="contact-business-link"
					>
						Colligan Tech Solutions LLC
					</a>
					.
				</p>

				<div className="contact-links">
					<a href={`mailto:${EMAIL}`} className="contact-link">
						<FaEnvelope aria-hidden="true" /> Email
					</a>
					<a
						href={LINKEDIN_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="contact-link"
					>
						<FaLinkedin aria-hidden="true" /> LinkedIn
					</a>
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="contact-link"
					>
						<FaGithub aria-hidden="true" /> GitHub
					</a>
				</div>
			</motion.div>
		</Container>
	);
};

export default Contact;
