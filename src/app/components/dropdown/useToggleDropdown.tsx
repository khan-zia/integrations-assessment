import { useState } from 'react';
import { DropdownPosition } from './Dropdown';

type ToggleDropdownHookProps = Pick<
	NonNullable<DropdownPosition>,
	'placement' | 'topOffset'
>;

export const useToggleDropdown = (props?: ToggleDropdownHookProps) => {
	const { placement, topOffset } = props || {};
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const [dropdownPosition, setDropdownPosition] =
		useState<DropdownPosition>();

	const toggleDropDown = (e: React.MouseEvent<HTMLElement>) => {
		// If dropdown is being closed.
		if (dropdownOpen) {
			setDropdownOpen(false);
			return;
		}

		const elementBounds = e.currentTarget.getBoundingClientRect();
		const hasScrolled = e.currentTarget.ownerDocument.defaultView;
		let yPosition = elementBounds.bottom;
		let xPosition = elementBounds.left;

		// We need to take into account any scrolling because we need to display the
		// dropdown relative to the web page not viewport.
		if (hasScrolled) {
			yPosition += hasScrolled.scrollY;
			xPosition += hasScrolled.scrollX;
		}

		setDropdownPosition({
			placement: placement || 'left', // defaults to left.
			topOffset: topOffset || 0.13, // defaults to 0.13 rems dictated by Figma designs.
			top: yPosition,
			left: xPosition,
			parentRect: elementBounds,
		});

		setDropdownOpen(true);
	};

	return [
		dropdownOpen,
		setDropdownOpen,
		dropdownPosition,
		toggleDropDown,
	] as const; // Make the tuple's type readonly.
};
