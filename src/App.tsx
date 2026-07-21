import { ThemeProvider } from './context/ThemeContext';
import { useActiveSection } from './hooks/useActiveSection';
import CustomCursor from './components/CustomCursor/CustomCursor';
import TopNav from './components/TopNav/TopNav';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AmbientParticles from './components/AmbientParticles/AmbientParticles';
import './styles/theme.css';

const menuItems = [
	{ name: 'Home', id: 'intro-content' },
	{ name: 'About', id: 'skills-content' },
	{ name: 'Experience', id: 'experience-content' },
	{ name: 'Education', id: 'education-content' },
	{ name: 'Contact', id: 'contact-content' },
];

function AppContent() {
	const activeSection = useActiveSection(menuItems.map((item) => item.id));

	return (
		<>
			<CustomCursor />
			<TopNav menuItems={menuItems} activeSection={activeSection} />

      <main>
        <Hero />
        <div className="ambient-particles-wrapper">
          <AmbientParticles />
          <About />
          <Experience />
          <Education />
          <Contact />
          <Footer />
        </div>
      </main>
		</>
	);
}

function App() {
	return (
		<ThemeProvider>
			<AppContent />
		</ThemeProvider>
	);
}

export default App;