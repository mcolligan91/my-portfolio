import './SectionHeader.scss';

interface SectionHeaderProps {
	number: string;
	title: string;
}

const SectionHeader = ({ number, title }: SectionHeaderProps) => (
	<div className="section-header">
		<span className="section-header-number">{number}</span>
		<h2 className="section-header-title">{title}</h2>
		<span className="section-header-line" aria-hidden="true" />
	</div>
);

export default SectionHeader;
