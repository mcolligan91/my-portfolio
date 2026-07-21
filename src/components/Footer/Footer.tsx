import { motion } from 'framer-motion';
import './Footer.scss';

const scrollToTop = () => {
	window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

const Footer = () => {
	return (
		<footer className="site-footer">
			<p className="site-footer-credit">Built with React &amp; TypeScript</p>

			<p className="site-footer-copyright">© {new Date().getFullYear()} Michael Colligan</p>

			<motion.button
				type="button"
				className="site-footer-top"
				onClick={scrollToTop}
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 1 }}
				transition={{ duration: 0.5 }}
			>
				&uarr; Top
			</motion.button>
		</footer>
	);
};

export default Footer;