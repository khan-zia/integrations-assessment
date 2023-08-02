import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../../app/components/button';
import { ReactComponent as AddIcon } from '../../assets/icons/add-icon.svg';

describe('Tests for the Button component', () => {
	it('Renders the button component properly.', () => {
		render(<Button title="button" />);
		const buttonElement = screen.getByText('button');
		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement).toBeVisible();
	});

	it('Renders the button with an icon properly.', () => {
		const { container } = render(
			<Button title="button" icon={<AddIcon />} />,
		);
		const svgIcon = container.querySelector('svg');
		expect(svgIcon).toBeInTheDocument();
		expect(svgIcon).toBeVisible();
	});

	it('Can render the button only with an icon without text.', () => {
		const { container } = render(<Button icon={<AddIcon />} />);
		const svgIcon = container.querySelector('svg');
		expect(svgIcon).toBeInTheDocument();
		expect(svgIcon).toBeVisible();

		// Button should have no text.
		expect(container.querySelector('button')?.innerText).toBe(undefined);
	});

	it('Can render a disabled button properly.', () => {
		const onClickTest = vi.fn();
		render(<Button title="button" disabled onClick={onClickTest} />);
		const button = screen.getByText('button');

		// Button should be visibly disabled.
		expect(button).toBeDisabled();

		// Clicking must not trigger the onClick callback.
		fireEvent.click(button);
		expect(onClickTest).toHaveBeenCalledTimes(0);
	});
});
