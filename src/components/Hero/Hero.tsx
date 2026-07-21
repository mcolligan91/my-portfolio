import { useTypewriter } from '../../hooks/useTypewriter';
import ParticleNetwork from './ParticleNetwork';
import './Hero.scss';

const NAME = 'Michael Colligan';
const SUBTEXT = 'Senior Software Engineer';

const Hero = () => {
	const { displayedText, hasStarted, isDone } = useTypewriter({
		text: NAME,
		speedMs: 130,
		startDelayMs: 1000,
	});

	return (
		<section className="hero" id="intro-content">
			<ParticleNetwork />

			<h1 className="hero-name">
				{displayedText}
				<span
					className={`hero-cursor ${hasStarted && !isDone ? 'hero-cursor-typing' : ''}`}
					aria-hidden="true"
				/>
			</h1>

			<div className={`hero-reveal ${isDone ? 'hero-reveal-visible' : ''}`}>
				<p className="hero-subtext">{SUBTEXT}</p>
				<p className="hero-description">
					I build clean, reliable software,
					<br />
					from front-end interfaces to the systems behind them.
				</p>

				<div className="hero-actions">
					<a className="hero-cta" href="#contact-content">
						Get in touch
					</a>
				</div>
			</div>

			<button
				type="button"
				className="hero-scroll-cue"
				aria-label="Scroll to next section"
				onClick={() =>
					document.getElementById('skills-content')?.scrollIntoView({ behavior: 'smooth' })
				}
			>
				<span aria-hidden="true">&gt; scroll</span>
			</button>
		</section>
	);
};

export default Hero;