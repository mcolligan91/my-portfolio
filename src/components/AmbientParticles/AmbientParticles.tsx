import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './AmbientParticles.scss';

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
}

// Deliberately lighter than the Hero's ParticleNetwork: no connecting lines
// (skips the pairwise distance checks entirely) — but tune these four
// numbers to make it more or less noticeable:
const MAX_PARTICLES = 140; // hard cap on particle count
const DENSITY_DIVISOR = 15000; // lower = more particles per unit of area
const MAX_DPR = 1.5;

const AmbientParticles = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { theme } = useTheme();

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const canvas = canvasRef.current;
		const wrapper = canvas?.parentElement;
		if (!canvas || !wrapper) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const dotColor = theme === 'dark' ? 'rgba(125, 211, 252, 0.5)' : 'rgba(2, 85, 128, 0.45)';

		let particles: Particle[] = [];
		let animationId = 0;
		let width = 0;
		let height = 0;

		const resize = () => {
			const rect = wrapper.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			width = rect.width;
			height = rect.height;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / DENSITY_DIVISOR));
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

				ctx.beginPath();
				ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
				ctx.fillStyle = dotColor;
				ctx.fill();
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
		visibilityObserver.observe(wrapper);

		window.addEventListener('resize', resize);

		return () => {
			stop();
			visibilityObserver.disconnect();
			window.removeEventListener('resize', resize);
		};
	}, [theme]);

	return <canvas ref={canvasRef} className="ambient-particles" aria-hidden="true" />;
};

export default AmbientParticles;