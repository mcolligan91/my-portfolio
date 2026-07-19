import { useTypewriter } from '../../hooks/useTypewriter';
import './Hero.scss';

const NAME = 'Michael Colligan';
const SUBTEXT = 'Front-end engineer who also builds the data behind the scenes.';
const DESCRIPTION = 'React & TypeScript on the front end, Python & SQL for data automation and ETL work.';

const Hero = () => {
	const { displayedText, isDone } = useTypewriter({ text: NAME, speedMs: 45 });

	return (
		<section className="hero" id="intro-content">
			<h1 className="hero-name">
				{displayedText}
				<span className="hero-cursor" aria-hidden="true" />
			</h1>

			<div className={`hero-reveal ${isDone ? 'hero-reveal-visible' : ''}`}>
				<p className="hero-subtext">{SUBTEXT}</p>
				<p className="hero-description">{DESCRIPTION}</p>

				<div className="hero-actions">
					<a className="hero-cta" href="/resume.pdf" download>
						View resume
					</a>
					<a className="hero-cta hero-cta-quiet" href="#contact-content">
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
