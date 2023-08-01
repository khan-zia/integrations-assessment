import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './TextField.module.css';

interface TextFieldProps extends React.ComponentPropsWithoutRef<'input'> {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	variant?: 'default' | 'success' | 'info' | 'warn' | 'danger';
}

const TextField = forwardRef(
	(
		props: TextFieldProps,
		ref: React.ForwardedRef<HTMLInputElement>,
	): JSX.Element => {
		const { value, setValue, variant, ...rest } = props;

		// Conditionally pick CSS classes to apply.
		const inputClasses = classNames(styles.input, {
			[styles.danger]: variant === 'danger',

			// Similarly, we could easily implement other variants and sizes.
			// Out of scope.
		});

		return (
			<div className={styles.inputWrapper}>
				<input
					type="text"
					className={inputClasses}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					ref={ref}
					{...rest}
				/>
			</div>
		);
	},
);

export default TextField;
