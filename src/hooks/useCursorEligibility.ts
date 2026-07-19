import { useEffect, useState } from 'react';

/**
 * The custom cursor should only run for visitors who both:
 *  - have a precise pointer (a mouse/trackpad, not a touchscreen), and
 *  - have not asked their OS to reduce motion.
 * Unlike the Hero's typing effect, this one stays fully respectful of
 * prefers-reduced-motion, since a cursor that constantly animates in
 * response to every mouse movement is a much more persistent, unavoidable
 * motion source than a one-time typing effect.
 */
export function useCursorEligibility() {
	const [eligible, setEligible] = useState(false);

	useEffect(() => {
		const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		setEligible(hasFinePointer && !prefersReducedMotion);
	}, []);

	return eligible;
}
