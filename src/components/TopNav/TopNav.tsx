import { useEffect, useRef, useState } from 'react';
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
	const [isScrolled, setIsScrolled] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (!expanded) return;

		const handleOutsideClick = (e: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				setExpanded(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [expanded]);

	return (
		<div ref={navRef}>
			<Navbar
				expand="md"
				fixed="top"
				expanded={expanded}
				onToggle={setExpanded}
				className={`top-nav ${isScrolled ? 'top-nav-scrolled' : ''}`}
			>
				<Container>
					<Navbar.Brand
						href="#intro-content"
						className="top-nav-brand"
						onClick={(e) => {
							e.preventDefault();
							scrollToSection('intro-content');
						}}
					>
						<span className="top-nav-logo-bracket">&lt;</span>MC
						<span className="top-nav-logo-bracket">/&gt;</span>
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
		</div>
	);
};

export default TopNav;