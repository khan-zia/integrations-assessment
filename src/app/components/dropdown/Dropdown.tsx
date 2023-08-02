import { ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.css';

type DropdownPlacement = 'left' | 'middle' | 'right';

interface BaseDropdownPosition {
	/**
	 * If set to "left", dropdown will be aligned underneath the parent element such that
	 * the parent's and dropdown's left sides perfectly align.
	 *
	 * If set to "right", dropdown will be aligned underneath the parent element such that
	 * the parent's and dropdown's right sides perfectly align.
	 *
	 * If set to "middle", dropdown will be aligned underneath the parent element such that
	 * the parent's and dropdown's midpoints with respect to their width align.
	 */
	placement: DropdownPlacement;

	/**
	 * Value in pixels where the dropdown's top should start.
	 */
	top?: number;

	/**
	 * Value in pixels where the dropdown's left should start.
	 */
	left?: number;

	/**
	 * Value in rems that determines the vertical gap between the parent element and the dropdown.
	 */
	topOffset?: number;

	/**
	 * Result of the .getBoundingClientRect() native JavaScript function for the parent element.
	 * This value is required if the specified placement is "middle" or "right".
	 */
	parentRect?: DOMRect;
}

interface DropdownPositionLeft extends BaseDropdownPosition {
	placement: 'left';
	top: number;
	left: number;
}

interface DropdownPositionMiddleRight extends BaseDropdownPosition {
	placement: Exclude<DropdownPlacement, 'left'>;
	top: number;
	left: number;
	parentRect: DOMRect;
}

export type DropdownPosition =
	| undefined
	| DropdownPositionLeft
	| DropdownPositionMiddleRight;

export type BaseDropdownProps = {
	/**
	 * Determines if the dropdown should be opened or closed.
	 */
	open: boolean;

	/**
	 * Object with values that determines the dropdown's positioning in the document.
	 */
	position: DropdownPosition;

	/**
	 * A React RefObject value of the dropdown's parent element. This is required to determine the
	 * closure of dropdown when user interacts with the document (e.g. clicks) outside the bounds of
	 * the dropdown and this defined parent element.
	 */
	parentRef: React.RefObject<HTMLElement>;

	/**
	 * Callback function invoked when the dropdown should close. This callback can do anything required
	 * but at least it must set the "open" prop to boolean "false".
	 */
	onClose: () => void;
};

type DropdownProps = BaseDropdownProps & {
	children: ReactNode;
};

/**
 * This is the base Dropdown component that is intended for use as a wrapper for
 * any DOM element that needs to be a dropdown. All core dropdown related functionality
 * is refactored in this base component while allowing to be easily extended by its children
 * as necessary.
 */
const Dropdown = (props: DropdownProps): JSX.Element => {
	const { open, position, parentRef, onClose, children } = props;
	const dropdownRef = useRef<HTMLDivElement>(null);

	const dropdownClasses = classNames(styles.dropdown, {
		[styles.dropdownOpen]: open,
		[styles.dropdownClose]: !open,
	});

	/**
	 * As long as the position doesn't change, there's no need to recalculate the dropdown's position
	 * on each re-render. Keep this calculation to the bare minimum required.
	 *
	 * ! el.getBoundingClientRect() forces browsers to synchronously calculate document's layout.
	 * ! window.getComputedStyle() triggers browsers to synchronously recalculate styles of the required element.
	 */
	useEffect(() => {
		if (!position || !dropdownRef.current) return;

		// Check if any additional top offset is defined. It's in rems units,
		// Convert it to pixels first.
		const topOffset = position.topOffset
			? position.topOffset *
			  parseFloat(
					window
						.getComputedStyle(document.documentElement)
						.fontSize.replace('px', ''),
			  )
			: 0;

		// If needs to be aligned with the left of the parent.
		if (position.placement === 'left') {
			dropdownRef.current.style.top = `${position.top + topOffset}px`;
			dropdownRef.current.style.left = `${position.left}px`;

			return;
		}

		// If needs to be aligned with the right of the parent.
		if (position.placement === 'right') {
			// We need width of the Dropdown so we can display it from the left (x-axis)
			// such that its right side aligns with the right side of the parent element.
			const width = dropdownRef.current.getBoundingClientRect().width;

			// Formula: Parent's xPosition - (Dropdown width - Parent width)
			const x = position.left - (width - position.parentRect.width);

			dropdownRef.current.style.top = `${position.top + topOffset}px`;
			dropdownRef.current.style.left = `${x}px`;

			return;
		}

		// If needs to be aligned with the middle of the parent.
		// We need width of the Dropdown so we can display it from the left (x-axis)
		// such that its center aligns with the center of the parent element.
		const width = dropdownRef.current.getBoundingClientRect().width;

		// Formula: Parent's xPosition + (Parent's width / 2) - (Dropdown's width / 2)
		const x = position.left + position.parentRect.width / 2 - width / 2;

		dropdownRef.current.style.top = `${position.top + topOffset}px`;
		dropdownRef.current.style.left = `${x}px`;
	}, [position, dropdownRef]);

	// Close dropdown on any outside click.
	useEffect(() => {
		if (!open) return;

		const close = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				parentRef.current &&
				!parentRef.current.contains(e.target as HTMLElement) &&
				!dropdownRef.current.contains(e.target as HTMLElement)
			) {
				onClose();
			}
		};

		/**
		 * Because of React's async nature, this closing listener on the Window object will not
		 * allow any programmatic triggers to open Dropdowns. Usually, code triggered .click()
		 * events. To allow for any code triggered events to be registered by the
		 * parentRef.current.contains(), a minor delay is both sufficient and efficient.
		 */
		setTimeout(() => window.addEventListener('click', close), 10);

		// clean up event on unmount.
		return () => window.removeEventListener('click', close);
	}, [open, parentRef, dropdownRef]);

	return (
		<div className={dropdownClasses} ref={dropdownRef}>
			{children}
		</div>
	);
};

export default Dropdown;
