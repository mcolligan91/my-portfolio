import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ParticleNetwork.scss';

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
}

// Performance guardrails, deliberately conservative after the earlier
// CPU/fan issue with the JS-driven background glow:
// - canvas-based, not DOM elements or CSS background tricks
// - particle count capped regardless of screen size
// - device pixel ratio capped (retina screens can otherwise multiply
//   canvas rendering cost 3-4x for no visible benefit at this scale)
// - the whole animation pauses via IntersectionObserver the instant
//   Hero scrolls out of view, rather than running forever in the background
// - skipped entirely under prefers-reduced-motion
const MAX_PARTICLES = 90;
const CONNECT_DISTANCE = 130;
const MAX_DPR = 1.5;
const CURSOR_RADIUS = 110; // how close the cursor needs to be to affect a particle
const CURSOR_STRENGTH = 6; // how hard particles get pushed away

const ParticleNetwork = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { theme } = useTheme();

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const canvas = canvasRef.current;
		const section = canvas?.parentElement;
		if (!canvas || !section) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const dotColor = theme === 'dark' ? 'rgba(125, 211, 252, 0.4)' : 'rgba(3, 105, 161, 0.35)';
		const lineColorBase = theme === 'dark' ? '125, 211, 252' : '3, 105, 161';

		let particles: Particle[] = [];
		let animationId = 0;
		let width = 0;
		let height = 0;
		// Kept far off-canvas until the mouse actually enters the section,
		// so particles aren't affected before the cursor is really there.
		const mouse = { x: -9999, y: -9999 };

		const handleMouseMove = (e: MouseEvent) => {
			const rect = section.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
		};

		const handleMouseLeave = () => {
			mouse.x = -9999;
			mouse.y = -9999;
		};

		const resize = () => {
			const rect = section.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			width = rect.width;
			height = rect.height;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / 10000));
			particles = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
			}));
		};

		const draw = () => {
			ctx.clearRect(0, 0, width, height);

			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0 || p.x > width) p.vx *= -1;
				if (p.y < 0 || p.y > height) p.vy *= -1;

				// Push the particle away from the cursor if it's close enough —
				// this is what makes the connecting lines stretch as you move
				// through them, since the particles themselves are displaced.
				const dx = p.x - mouse.x;
				const dy = p.y - mouse.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < CURSOR_RADIUS && dist > 0.01) {
					const force = ((CURSOR_RADIUS - dist) / CURSOR_RADIUS) * CURSOR_STRENGTH;
					p.x += (dx / dist) * force;
					p.y += (dy / dist) * force;
				}

				ctx.beginPath();
				ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
				ctx.fillStyle = dotColor;
				ctx.fill();
			}

			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < CONNECT_DISTANCE) {
						const opacity = 0.08 * (1 - dist / CONNECT_DISTANCE);
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.strokeStyle = `rgba(${lineColorBase}, ${opacity})`;
						ctx.lineWidth = 1;
						ctx.stroke();
					}
				}
			}

			animationId = requestAnimationFrame(draw);
		};

		const stop = () => cancelAnimationFrame(animationId);
		const start = () => {
			stop();
			animationId = requestAnimationFrame(draw);
		};

		resize();

		const visibilityObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) start();
				else stop();
			},
			{ threshold: 0 }
		);
		visibilityObserver.observe(section);

		window.addEventListener('resize', resize);
		section.addEventListener('mousemove', handleMouseMove);
		section.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			stop();
			visibilityObserver.disconnect();
			window.removeEventListener('resize', resize);
			section.removeEventListener('mousemove', handleMouseMove);
			section.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [theme]);

	return <canvas ref={canvasRef} className="particle-network" aria-hidden="true" />;
};

export default ParticleNetwork;