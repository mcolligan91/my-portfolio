import { motion } from 'framer-motion';
import { Container } from 'react-bootstrap';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';
import './Experience.scss';

interface Position {
	title: string;
	dates: string;
	bullets: string[];
}

interface Job {
	company: string;
	companyLink?: string;
	positions: Position[];
	skills: string[];
}

const jobs: Job[] = [
	{
		company: 'Optavise, a division of CNO Financial Group',
		companyLink: 'https://www.optavise.com/',
		positions: [
			{
				title: 'Senior Software Engineer',
				dates: '2024 - Present',
				bullets: [
					'Design and implement features for enterprise Angular web applications, supporting complex workflows and high-volume business operations.',
					'Collaborate with product and engineering teams to translate requirements into maintainable front-end architecture and reusable components.',
					'Conduct code reviews, optimize application performance, and enforce best practices to reduce technical debt and improve maintainability.',
				],
			},
		],
		skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
	},
	{
		company: 'Colligan Tech Solutions LLC',
		companyLink: 'https://www.colligantechsolutions.com/',
		positions: [
			{
				title: 'Owner / Software Developer (Part-time)',
				dates: '2024 - Present',
				bullets: [
					'Design and enhance Python-based data pipelines that transform, validate, and enrich datasets prior to ingestion into SQL Server, including integration of AI machine learning models for automated data classification and analysis.',
					'Develop technical documentation and training materials for client engineers to maintain workflows independently.',
				],
			},
		],
		skills: ['Python', 'SQL Server', 'Machine Learning', 'ETL'],
	},
	{
		company: 'D+R International',
		companyLink: 'https://www.drintl.com/',
		positions: [
			{
				title: 'Software Engineer',
				dates: '2018 - 2024',
				bullets: [
					'Developed Python scripts for automating internal data analysis processes and report generation, resulting in a 95% improvement in efficiency for analysts and project managers and heightened data quality and reliability.',
					'Achieved a 97% efficiency improvement as the lead developer on a Python data pipeline project, implementing comprehensive SQL queries to conduct data validation checks at different pipeline stages for the processing of over 1 million new records.',
					'Contributed to the end-to-end development of user-friendly websites as a front-end developer, ensuring the implementation of dynamic and user-friendly interfaces for users from 150+ organizations.',
				],
			},
			{
				title: 'Senior Technical Analyst',
				dates: '2017 - 2018',
				bullets: [
					'Led weekly discussions with a group of 12 analysts as a review team leader, offering guidance and making decisions on nuanced situations encountered during the analysis process.',
					'Developed and implemented VBA scripts to streamline various data collection processes, contributing to the content of monthly reports for the client.',
					'Supervised two direct reports, conducted weekly meetings to offer guidance and optimize workload balance, and provided performance review information to HR.',
				],
			},
			{
				title: 'Technical Analyst',
				dates: '2015 - 2017',
				bullets: [
					'Reviewed and validated LED lighting performance test data to ensure accuracy and compliance with client qualification standards, contributing to the successful qualification of 17,500 products.',
					'Collaborated with cross-functional team members to enhance internal Excel data analysis tools, leveraging advanced formula writing techniques to improve accuracy and efficiency for a team of 35 analysts.',
					'Acted as team lead for logo compliance and brand integrity, collaborating with the client and their law firm to establish and enforce usage guidelines.',
				],
			},
		],
		skills: ['React', 'jQuery', 'Bootstrap', 'SQL', 'VBA', 'Excel'],
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
							{job.skills.map((skill) => (
								<span key={skill} className="experience-skill-pill">
									{skill}
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
