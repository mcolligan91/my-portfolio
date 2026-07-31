import { motion } from 'framer-motion';
import ParticleNetwork from './ParticleNetwork';
import './Hero.scss';

const NAME = 'Michael Colligan';
const LETTER_STAGGER = 0.03;
const NAME_DURATION = NAME.length * LETTER_STAGGER;
const NAME_START_DELAY = 0.2;
const REVEAL_START_DELAY = NAME_START_DELAY + NAME_DURATION + 0.3;

const nameContainerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: LETTER_STAGGER,
			delayChildren: NAME_START_DELAY,
		},
	},
};

const letterVariants = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const revealContainerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15,
			delayChildren: REVEAL_START_DELAY,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Hero = () => {
	return (
		<section className="hero" id="intro-content">
			<ParticleNetwork />

			<motion.h1
				className="hero-name"
				variants={nameContainerVariants}
				initial="hidden"
				animate="visible"
			>
				{NAME.split('').map((char, i) => (
					<motion.span key={i} className="hero-letter" variants={letterVariants}>
						{char === ' ' ? '\u00A0' : char}
					</motion.span>
				))}
			</motion.h1>

			<motion.div
				className="hero-reveal"
				variants={revealContainerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.p variants={itemVariants} className="hero-subtext">
					Senior Software Engineer
				</motion.p>
				<motion.p variants={itemVariants} className="hero-description">
					I build clean, reliable software,
					<br />
					from front-end interfaces to the systems behind them.
				</motion.p>

				<motion.div variants={itemVariants} className="hero-actions">
					<a
						className="hero-cta"
						href="#contact-content"
						onClick={(e) => {
							e.preventDefault();
							document
								.getElementById('contact-content')
								?.scrollIntoView({ behavior: 'smooth', block: 'start' });
						}}
					>
						Get in touch
					</a>
				</motion.div>
			</motion.div>

			<motion.button
				type="button"
				className="hero-scroll-cue"
				aria-label="Scroll to next section"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: REVEAL_START_DELAY + 0.6, duration: 0.6 }}
				onClick={() =>
					document.getElementById('skills-content')?.scrollIntoView({ behavior: 'smooth' })
				}
			>
				<span aria-hidden="true">&gt; scroll</span>
			</motion.button>
		</section>
	);
};

export default Hero;