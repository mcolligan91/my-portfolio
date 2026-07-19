import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './TopNav.scss';

export interface NavItem {
	name: string;
	id: string;
}

interface TopNavProps {
	menuItems: NavItem[];
	activeSection: string;
}

const scrollToSection = (id: string) => {
	if (id === 'intro-content') {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		return;
	}
	document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const TopNav = ({ menuItems, activeSection }: TopNavProps) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<Navbar expand="md" fixed="top" expanded={expanded} onToggle={setExpanded} className="top-nav">
			<Container>
				<Navbar.Brand
					href="#intro-content"
					className="top-nav-brand"
					onClick={(e) => {
						e.preventDefault();
						scrollToSection('intro-content');
					}}
				>
					<span className="top-nav-logo-bracket">&lt;</span>MC<span className="top-nav-logo-bracket">/&gt;</span>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="main-nav" />

				<Navbar.Collapse id="main-nav">
					<Nav className="ms-auto top-nav-links">
						{menuItems.map(({ name, id }) => (
							<Nav.Link
								key={id}
								href={`#${id}`}
								className={`top-nav-link ${activeSection === id ? 'top-nav-link-active' : ''}`}
								onClick={(e) => {
									e.preventDefault();
									scrollToSection(id);
									setExpanded(false);
								}}
							>
								{name}
							</Nav.Link>
						))}
					</Nav>

					<div className="top-nav-toggle-wrapper">
						<ThemeToggle />
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default TopNav;
