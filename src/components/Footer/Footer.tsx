import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from '../../constants/contactLinks';
import './Footer.scss';

const scrollToTop = () => {
	window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

const Footer = () => {
	return (
		<footer className="site-footer">
			<div className="site-footer-links">
				<a href={`mailto:${EMAIL}`} aria-label="Email">
					<FaEnvelope />
				</a>
				<a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
					<FaLinkedin />
				</a>
				<a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
					<FaGithub />
				</a>
			</div>

			<p className="site-footer-copyright">© {new Date().getFullYear()} Michael Colligan</p>

			<button type="button" className="site-footer-top" onClick={scrollToTop}>
				&uarr; Top
			</button>
		</footer>
	);
};

export default Footer;