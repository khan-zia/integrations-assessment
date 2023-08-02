import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Dropdown } from 'src/app/components/dropdown';
import { DropdownPosition } from 'src/app/components/dropdown/Dropdown';

describe('The base Dropdown component tests.', () => {
	it('renders the component with open = true being visible to the user.', () => {
		const { container } = render(
			<Dropdown
				open={true}
				position={undefined}
				parentRef={React.createRef()}
				onClose={() => {}}
			>
				<span>Dropdown Content</span>
			</Dropdown>,
		);

		// The container must have a "div" element which is the dropdown and be visible to the user.
		const dropdownElement = container.querySelector('div');
		expect(dropdownElement).toBeInTheDocument();
		expect(dropdownElement).toBeVisible();
	});

	it('renders the component with open = false and therefore not visible to the user.', () => {
		const { container } = render(
			<Dropdown
				open={false}
				position={undefined}
				parentRef={React.createRef()}
				onClose={() => {}}
			>
				<span>Dropdown Content</span>
			</Dropdown>,
		);

		const dropdownElement = container.querySelector('div');
		const actualDisplay = window.getComputedStyle(dropdownElement!).display;

		expect(dropdownElement).toBeInTheDocument();
		expect(actualDisplay).toBe('none');
	});

	it('renders the component with placement = "left"', () => {
		const { container } = render(
			<Dropdown
				open={true}
				position={{
					placement: 'left',
					top: 100,
					left: 50,
				}}
				parentRef={React.createRef()}
				onClose={() => {}}
			>
				<span>Dropdown Content</span>
			</Dropdown>,
		);

		const dropdownElement = container.querySelector('div');

		// For "left" placement, the dropdown should be positioned exactly at the
		// specified top and left points.
		expect(dropdownElement).toBeInTheDocument();
		expect(dropdownElement!.style.top).toBe('100px');
		expect(dropdownElement!.style.left).toBe('50px');
	});

	it('renders the component with the correct amount of defined topOffset.', () => {
		// Mock the getComputedStyle method on the Window object because JSDOM has
		// mocked it by default returning useless values.
		window.getComputedStyle = vi.fn().mockReturnValue({
			fontSize: '16px',
		});

		const { container } = render(
			<Dropdown
				open={true}
				position={{
					placement: 'left',
					top: 100,
					left: 50,
					topOffset: 1.358,
				}}
				parentRef={React.createRef()}
				onClose={() => {}}
			>
				<span>Dropdown Content</span>
			</Dropdown>,
		);

		const dropdownElement = container.querySelector('div');

		// We know the base font-size in test env is 16. The topOffset is defined in rems.
		const expectedY = 1.358 * 16 + 100; // plus the defined top position.

		expect(dropdownElement!.style.top).toBe(`${expectedY}px`);
		expect(dropdownElement!.style.left).toBe('50px');
	});

	it('renders the component with placement = "middle"', () => {
		// This test will make use of this width value as
		// mocked Rect object of the dropdown.
		const DOMRect: DOMRect = {
			width: 200,
			x: 0,
			y: 0,
			height: 0,
			bottom: 0,
			left: 0,
			right: 0,
			top: 0,
			toJSON: () => null,
		};

		const position: DropdownPosition = {
			placement: 'middle',
			top: 100,
			left: 50,
			parentRect: {
				...DOMRect,

				// Our interest for this test lies in the width of parent element.
				width: 100,
			},
		};

		// We know that the outermost wrapper of the Dropdown is a "div" element.
		// We know that the Dropdown component will call the getBoundingClientRect
		// method so we mock it because JSDOM also by default mocks it and returns
		// 0 for all values.
		vi.spyOn(
			window.HTMLDivElement.prototype,
			'getBoundingClientRect',
		).mockImplementation(() => DOMRect);

		// Render
		const { container } = render(
			<Dropdown
				open={true}
				position={position}
				parentRef={React.createRef()}
				onClose={() => {}}
			>
				<span>Dropdown Content</span>
			</Dropdown>,
		);

		const dropdownElement = container.querySelector('div');

		// For placement "middle", the dropdown should be horizontally centered
		// with the center of the parent. As per the formula, the dropdown should be
		// positioned at: Parent's xPosition + (Parent's width / 2) - (Dropdown's width / 2)
		const expectedX =
			position.left + position.parentRect.width / 2 - DOMRect.width / 2;

		expect(dropdownElement!.style.top).toBe('100px');
		expect(dropdownElement!.style.left).toBe(`${expectedX}px`);
	});

	it('renders the component with placement = "right" properly.', () => {
		const DOMRect: DOMRect = {
			width: 249,
			x: 0,
			y: 0,
			height: 0,
			bottom: 0,
			left: 0,
			right: 0,
			top: 0,
			toJSON: () => null,
		};

		const position: DropdownPosition = {
			placement: 'right',
			top: 40,
			left: 300,
			parentRect: {
				...DOMRect,

				// Override parent's width
				width: 150,
			},
		};

		// Spy on the getBoundingClientRect() call of the Dropdown.
		vi.spyOn(
			window.HTMLDivElement.prototype,
			'getBoundingClientRect',
		).mockImplementation(() => DOMRect);

		// Render
		const { container } = render(
			<Dropdown
				open={true}
				position={position}
				parentRef={React.createRef()}
				onClose={() => {}}
			>
				<span>Dropdown Content</span>
			</Dropdown>,
		);

		const dropdownElement = container.querySelector('div');

		// For the "right" placement, Dropdown and its parent's right sides must align.
		// Formula: Parent's xPosition - (Dropdown width - Parent width)
		const expectedX =
			position.left - (DOMRect.width - position.parentRect.width);

		expect(dropdownElement!.style.top).toBe('40px');
		expect(dropdownElement!.style.left).toBe(`${expectedX}px`);
	});

	it('closes the dropdown on an outside click', () => {
		const parentRef = React.createRef<HTMLDivElement>();
		const onCloseMock = vi.fn();
		const outerNode = document.createElement('div');
		document.body.appendChild(outerNode);

		render(
			<>
				<div ref={parentRef} className="outside-dropdown"></div>
				<Dropdown
					open={true}
					position={undefined}
					parentRef={parentRef}
					onClose={onCloseMock}
				>
					<span>Dropdown Content</span>
				</Dropdown>
			</>,
		);

		// Trigger click somewhere outside.
		fireEvent.click(outerNode);

		// The onClose callback must have been called.
		// The 10 milliseconds are due a similar delay on the Window click listener which in turn
		// is a quick, easy fix to allow for automated clicks to open dropdowns programmatically.
		setTimeout(() => expect(onCloseMock).toHaveBeenCalled(), 10);
	});

	it('does not close the dropdown on an inside click', () => {
		const parentRef = React.createRef<HTMLDivElement>();
		const onCloseMock = vi.fn();

		const { container } = render(
			<>
				<div ref={parentRef}>Parent Element</div>
				<Dropdown
					open={true}
					position={undefined}
					parentRef={parentRef}
					onClose={onCloseMock}
				>
					<span id="drop-down-inside">Dropdown Content</span>
				</Dropdown>
			</>,
		);

		const insideElement = container.querySelector('#drop-down-inside');

		// Simulate a click inside the dropdown.
		fireEvent.click(insideElement!);

		// The dropdown should still be visible i.e. the onClose callback should not have been called.
		expect(onCloseMock).not.toHaveBeenCalled();
	});
});
