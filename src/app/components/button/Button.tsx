import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	title?: string;
	variant?: 'default' | 'success' | 'info' | 'warn' | 'danger';
	size?: 'tiny' | 'small' | 'medium' | 'large';
	icon?: JSX.Element;
	disabled?: boolean;
	cssClasses?: string[];
}

const Button = forwardRef(
	(
		props: ButtonProps,
		ref: React.ForwardedRef<HTMLButtonElement>,
	): JSX.Element => {
		const { title, variant, size, icon, disabled, cssClasses, ...rest } =
			props;

		// Use classNames to conditionally pick CSS classes.
		// e.g. Adds the styles.disabled class if the disabled prop is truthy.
		let btnClasses = classNames(styles.button, {
			[styles.default]: variant === 'default',
			[styles.tiny]: size === 'tiny',
			[styles.small]: size === undefined || size === 'small',
			[styles.disabled]: disabled,
			[styles.hasIcon]: icon !== undefined,
			[styles.iconOnly]: icon !== undefined && title === undefined,

			// Similarly, we could easily implement other sizes and variants.
			// Out of scope.
		});

		// If any additional classes are passed down from parent
		// to override or extended behavior.
		if (cssClasses) {
			btnClasses = classNames(btnClasses, ...cssClasses);
		}

		return (
			<button className={btnClasses} ref={ref} {...rest}>
				{icon} {title}
			</button>
		);
	},
);

export default Button;
