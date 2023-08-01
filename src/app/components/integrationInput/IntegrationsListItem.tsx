import { useRef } from 'react';
import { AddedIntegration } from './IntegrationInput';
import styles from './IntegrationInput.module.css';
import Button from '../button';
import { IntegrationLink } from '../integrationLink';
import { ReactComponent as DotsIcon } from '../../../assets/icons/dots-icon.svg';
import { IntegrationUpdateDropdown } from '../dropdown';
import { useToggleDropdown } from '../dropdown/useToggleDropdown';

type AddedIntegrationProps = {
	added: AddedIntegration;
};

const IntegrationsListItem = (props: AddedIntegrationProps): JSX.Element => {
	const { added } = props;
	const listItemMenuButton = useRef<HTMLButtonElement>(null);

	const [dropdownOpen, setDropdownOpen, position, toggleDropDown] =
		useToggleDropdown({ placement: 'right' });

	return (
		<>
			<div className={styles.addedIntegration} key={added.id}>
				<IntegrationLink added={added} />
				{added.status === 'resolving' && (
					<div className={styles.tag}>In Progress</div>
				)}
				{added.status !== 'error' && (
					<Button
						icon={<DotsIcon />}
						cssClasses={[styles.integrationMenuButton]}
						onClick={toggleDropDown}
						ref={listItemMenuButton}
					/>
				)}
			</div>
			{added.status !== 'error' && (
				<IntegrationUpdateDropdown
					open={dropdownOpen}
					onClose={() => setDropdownOpen(false)}
					position={position}
					parentRef={listItemMenuButton}
					integration={added}
				/>
			)}
		</>
	);
};

export default IntegrationsListItem;
