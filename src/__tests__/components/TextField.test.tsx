import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TextField } from '../../app/components/textField';

describe('TextField Component.', () => {
	it('can render the text field with default props.', () => {
		const { container } = render(
			<TextField value="" setValue={() => {}} />,
		);
		const inputElement = container.querySelector('input');

		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		expect(inputElement?.value).toBe('');
	});

	it('can render the text field with a specific variant', () => {
		const { container } = render(
			<TextField value="" setValue={() => {}} variant="danger" />,
		);
		const inputElement = container.querySelector('input');
		const actualColor = window.getComputedStyle(inputElement!).color;

		expect(inputElement).toBeInTheDocument();
		expect(actualColor).toBe('rgb(204, 16, 16)'); // the red danger color.
	});

	it('can properly call the onChange callback for updating value on input change.', () => {
		const mockSetValue = vi.fn();
		const { container } = render(
			<TextField value="" setValue={mockSetValue} />,
		);
		const inputElement = container.querySelector('input');

		// Force the onChange event on the input with a new value.
		fireEvent.change(inputElement!, { target: { value: 'New Value' } });

		expect(mockSetValue).toHaveBeenCalledTimes(1);
		expect(mockSetValue).toHaveBeenCalledWith('New Value');
	});

	it('forwards React refs properly when provided.', () => {
		const ref = React.createRef<HTMLInputElement>();
		render(<TextField value="" setValue={() => {}} ref={ref} />);

		// Expect the ref to have been assigned to the "input" element.
		expect(ref.current).toBeTruthy();
		expect(ref.current?.tagName).toBe('INPUT');
	});

	it('renders props properly when provided.', () => {
		const { container } = render(
			<TextField
				value=""
				setValue={() => {}}
				data-custom-attribute="custom-attr-value"
				placeholder="Float is awesome!!!"
			/>,
		);
		const inputElement = container.querySelector('input');

		// Expect that the supplied props (attributes) have been added to the input.
		expect(inputElement).toHaveAttribute(
			'data-custom-attribute',
			'custom-attr-value',
		);
		expect(inputElement).toHaveAttribute(
			'placeholder',
			'Float is awesome!!!',
		);
	});
});
