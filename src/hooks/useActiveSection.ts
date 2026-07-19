import { useEffect, useState } from 'react';

// Roughly matches the fixed nav height plus a little buffer, so a section
// is considered "reached" once it's scrolled just past the nav, not only
// once it's exactly at the very top of the viewport.
const SCROLL_OFFSET = 120;

/**
 * Watches the given section ids and returns whichever one the user has
 * scrolled to. Unlike an intersection-ratio approach, this works correctly
 * regardless of how tall or short each individual section is — a single
 * multi-card section and a two-line section are treated the same way.
 */
export function useActiveSection(sectionIds: string[]) {
	const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

	useEffect(() => {
		const handleScroll = () => {
			const scrolledToBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

			if (scrolledToBottom && sectionIds.length > 0) {
				setActiveId(sectionIds[sectionIds.length - 1]);
				return;
			}

			const scrollPosition = window.scrollY + SCROLL_OFFSET;

			let currentId = sectionIds[0];
			for (const id of sectionIds) {
				const el = document.getElementById(id);
				if (!el) continue;
				if (scrollPosition >= el.offsetTop) {
					currentId = id;
				}
			}
			setActiveId(currentId);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [sectionIds]);

	return activeId;
}