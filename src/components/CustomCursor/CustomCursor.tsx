import { useEffect, useRef } from 'react';
import { useCursorEligibility } from '../../hooks/useCursorEligibility';
import './CustomCursor.scss';

const CLICKABLE_SELECTOR = 'a, button, [role="button"], input, textarea, .top-nav-link';

// Lower = more trailing lag, higher = snappier. 0.18 is a good middle ground.
const RING_LERP_FACTOR = 0.18;

const CustomCursor = () => {
	const eligible = useCursorEligibility();
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!eligible) return;

		const dot = dotRef.current;
		const ring = ringRef.current;
		if (!dot || !ring) return;

		const targetPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		const ringPos = { ...targetPos };
		let rafId: number;
		let hasMoved = false;

		const handleMouseMove = (e: MouseEvent) => {
			targetPos.x = e.clientX;
			targetPos.y = e.clientY;

			// Wait for the first real mouse movement before hiding the system
			// cursor and revealing the custom one. Otherwise both the system
			// cursor and a custom cursor stuck at a guessed center position
			// are visible at once, right up until the user first moves the mouse.
			if (!hasMoved) {
				hasMoved = true;
				ringPos.x = targetPos.x;
				ringPos.y = targetPos.y;
				document.body.classList.add('custom-cursor-active');
				dot.classList.add('custom-cursor-visible');
				ring.classList.add('custom-cursor-visible');
			}
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const isClickable = Boolean(target.closest(CLICKABLE_SELECTOR));
			ring.classList.toggle('custom-cursor-ring-hover', isClickable);
		};

		const handleMouseDown = () => ring.classList.add('custom-cursor-ring-click');
		const handleMouseUp = () => ring.classList.remove('custom-cursor-ring-click');

		// The dot snaps straight to the cursor every frame (no lag).
		// The ring eases toward it via linear interpolation, which is what
		// creates the smooth trailing effect — decoupled from mousemove's
		// firing rate, so it stays smooth regardless of mouse polling rate.
		const animate = () => {
			ringPos.x += (targetPos.x - ringPos.x) * RING_LERP_FACTOR;
			ringPos.y += (targetPos.y - ringPos.y) * RING_LERP_FACTOR;

			dot.style.transform = `translate3d(${targetPos.x}px, ${targetPos.y}px, 0) translate(-50%, -50%)`;
			ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;

			rafId = requestAnimationFrame(animate);
		};
		rafId = requestAnimationFrame(animate);

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			cancelAnimationFrame(rafId);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mouseup', handleMouseUp);
			document.body.classList.remove('custom-cursor-active');
		};
	}, [eligible]);

	if (!eligible) return null;

	return (
		<>
			<div ref={dotRef} className="custom-cursor-dot" />
			<div ref={ringRef} className="custom-cursor-ring" />
		</>
	);
};

export default CustomCursor;