import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';
import './Experience.scss';

interface Position {
	title: string;
	dates: string;
	bullets: string[];
}

interface Skill {
	iconClass: string;
	text: string;
}

interface Job {
	company: string;
	companyLink?: string;
	positions: Position[];
	skills: Skill[];
}

const jobs: Job[] = [
	{
		company: 'Colligan Tech Solutions LLC',
		companyLink: 'https://www.colligantechsolutions.com/',
		positions: [
			{
				title: 'Owner / Software Developer',
				dates: '2024 - Present',
				bullets: [
					'Design and enhance Python-based data pipelines that transform, validate, and enrich datasets prior to ingestion into SQL Server, including integration of AI machine learning models for automated data classification and analysis.',
					'Develop technical documentation and training materials for client engineers to maintain workflows independently.',
				],
			},
		],
		skills: [
			{iconClass: 'react-original', text: 'React'},
			{iconClass: 'python-plain', text: 'Python'},
			{iconClass: 'pandas-plain', text: 'Pandas'},
			{iconClass: 'microsoftsqlserver-plain', text: 'SQL Server'},
			{iconClass: 'scikitlearn-plain', text: 'Scikit-learn'}
		],
	},
	{
		company: 'Optavise, a division of CNO Financial Group',
		companyLink: 'https://www.optavise.com/',
		positions: [
			{
				title: 'Senior Software Engineer',
				dates: '2024 - 2026',
				bullets: [
					'Designed and implemented features for enterprise Angular web applications, supporting complex workflows and high-volume business operations.',
					'Collaborated with product and engineering teams to translate requirements into maintainable front-end architecture and reusable components.',
					'Conducted code reviews, optimized application performance, and enforced best practices to reduce technical debt and improve maintainability.',
				],
			},
		],
		skills: [
			{iconClass: 'angularjs-plain', text: 'Angular'},
			{iconClass: 'typescript-plain', text: 'TypeScript'},
			{iconClass: 'html5-plain', text: 'HTML5'},
			{iconClass: 'sass-original', text: 'Sass'}
		]
	},
	{
		company: 'D+R International',
		companyLink: 'https://www.drintl.com/',
		positions: [
			{
				title: 'Software Engineer',
				dates: '2018 - 2024',
				bullets: [
					'Built Python automation scripts for internal data analysis and reporting, improving analyst efficiency by 95%.',
					'Led development of a Python/SQL data pipeline processing 1M+ records, improving efficiency by 97% through automated validation checks.',
					'Contributed front-end development for user-facing websites used by 150+ client organizations.',
				],
			},
			{
				title: 'Senior Data Analyst',
				dates: '2017 - 2018',
				bullets: [
					'Led weekly reviews for a team of 12 analysts, guiding decisions on complex, nuanced cases.',
					'Built VBA automation for data collection, streamlining monthly client reporting.',
				],
			},
			{
				title: 'Data Analyst',
				dates: '2015 - 2017',
				bullets: [
					'Validated LED lighting performance test data, supporting successful qualification of 17,500 products.',
					'Enhanced Excel-based analysis tools with advanced formulas, improving accuracy for a 35-person analyst team.',
				],
			},
		],
		skills: [
			{iconClass: 'javascript-plain', text: 'JavaScript'},
			{iconClass: 'react-original', text: 'React'},
			{iconClass: 'python-plain', text: 'Python'},
			{iconClass: 'html5-plain', text: 'HTML5'},
			{iconClass: 'css3-plain', text: 'CSS3'},
			{iconClass: 'microsoftsqlserver-plain', text: 'SQL Server'}
		]
	},
];

const Experience = () => {
	return (
		<Container as="section" id="experience-content" className="experience-section">
			<SectionHeader number="02" title="Experience" />

			<div className="experience-list">
				{jobs.map((job, i) => (
					<motion.div
						key={job.company}
						className="experience-card"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.7, delay: i * 0.1 }}
					>
						<h3 className="experience-company">
							{job.companyLink ? (
								<a
									href={job.companyLink}
									target="_blank"
									rel="noopener noreferrer"
									className="experience-company-link"
								>
									{job.company}
								</a>
							) : (
								job.company
							)}
						</h3>

						{job.positions.map((position) => (
							<div key={position.title} className="experience-position">
								<div className="experience-position-header">
									<span className="experience-title">{position.title}</span>
									<span className="experience-dates">{position.dates}</span>
								</div>
								<ul className="experience-bullets">
									{position.bullets.map((bullet, bi) => (
										<li key={bi}>{bullet}</li>
									))}
								</ul>
							</div>
						))}

						<div className="experience-skills">
							{job.skills.map((skill, i) => (
								<span key={i} className='experience-skill-pill'>
									<i className={`devicon-${skill.iconClass}`} /> 
									{skill.text}
								</span>
							))}
						</div>
					</motion.div>
				))}
			</div>
		</Container>
	);
};

export default Experience;