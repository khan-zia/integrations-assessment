import { useRef } from 'react';
import classNames from 'classnames';
import styles from './IntegrationLink.module.css';
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrow-down-icon.svg';
import { IntegrationUpdateDropdown } from '../dropdown';
import { AddedIntegration } from '../integrationInput/IntegrationInput';
import { useToggleDropdown } from '../dropdown/useToggleDropdown';

type IntegrationLinkProps = {
	/**
	 * Instance of the integration added by the user.
	 */
	added: AddedIntegration;

	/**
	 * Should the link be disabled? if true, user can't it to go to the integration's
	 * page.
	 */
	disabled?: boolean;
};

const IntegrationLink = (props: IntegrationLinkProps): JSX.Element => {
	const { added, disabled } = props;
	const [dropdownOpen, setDropdownOpen, position, toggleDropDown] =
		useToggleDropdown({ placement: 'right' });
	const integrationLinkRef = useRef<HTMLAnchorElement>(null);

	const linkClasses = classNames(styles.link, {
		[styles.disabled]: disabled,
		[styles.hasError]: added.status === 'error',
	});

	const linkTextClasses = classNames(styles.linkText, {
		[styles.linkTextDisabled]: disabled,
	});

	return (
		<>
			<a
				className={linkClasses}
				href={
					disabled || added.status === 'error'
						? undefined
						: added.link
				}
				target="_blank"
				onClick={(e) => {
					if (added.status === 'error') {
						toggleDropDown(e);
					}
				}}
				ref={integrationLinkRef}
			>
				<added.integration.Logo className={styles.logo} />
				{added.status !== 'error' && (
					<>
						<span
							className={classNames(
								linkTextClasses,
								styles.titleText,
							)}
						>
							{added.resolvedTitle}
						</span>
						<span className={linkTextClasses}>
							{added.resolvedSubtitle}
						</span>
					</>
				)}
				{added.status === 'error' && (
					<>
						<span
							className={classNames(
								styles.linkText,
								styles.linkTextError,
							)}
						>
							URL not recognized
						</span>
						<ArrowDown />
					</>
				)}
			</a>
			{added.status === 'error' && (
				<IntegrationUpdateDropdown
					open={dropdownOpen}
					onClose={() => setDropdownOpen(false)}
					position={position}
					integration={added}
					parentRef={integrationLinkRef}
				/>
			)}
		</>
	);
};

export default IntegrationLink;
