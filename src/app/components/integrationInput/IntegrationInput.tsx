import { useEffect, useRef, useState } from 'react';
import styles from './IntegrationInput.module.css';
import AddedIntegrationsList from './AddedIntegrationsList';
import Button from '../button';
import { ReactComponent as AddIcon } from '../../../assets/icons/add-icon.svg';
import { IntegrationDropdown } from '../dropdown';
import { Integration } from '../dropdown/IntegrationDropdown';
import { LinkInput } from '../dropdown';
import { useToggleDropdown } from '../dropdown/useToggleDropdown';

export type AddedIntegration = {
	id: number;
	link: string;
	integration: Integration;
	status: 'resolving' | 'resolved' | 'error';
	resolvedTitle?: string;
	resolvedSubtitle?: string;
};

const addedIntegrations: AddedIntegration[] = [];

const IntegrationInput = (): JSX.Element => {
	const [SelectedIntegration, setSelectedIntegration] = useState<
		undefined | Integration
	>(undefined);
	const integrationInputButton = useRef<HTMLButtonElement>(null);
	const addNewIntegrationButton = useRef<HTMLButtonElement>(null);
	const [dropdownOpen, setDropdownOpen, position, toggleDropDown] =
		useToggleDropdown();
	const [
		linkInputOpen,
		setLinkInputOpen,
		linkInputPosition,
		toggleLinkInput,
	] = useToggleDropdown({
		placement: 'middle',

		// We know the height of the Link Input's upward arrow is 0.4375 rems.
		// We need another 0.13 rems offset as dictated by design (Figma).
		topOffset: 0.4375 + 0.13,
	});

	// When a new integration is selected, open the LinkInput
	// dropdown automatically.
	useEffect(() => {
		// Make sure the button is rendered as well.
		if (!SelectedIntegration || !integrationInputButton.current) return;

		integrationInputButton.current.click();
	}, [SelectedIntegration, integrationInputButton]);

	// When a new integration link is submitted, handle it.
	const handleNewIntegration = (link: string) => {
		// We would send the link to the backend for further processing.
		// Out of scope.

		// Let's add a new integration with a "resolving" status.
		if (!SelectedIntegration) return;

		addedIntegrations.push({
			id: Date.now(), // Just a placeholder ID,
			link,
			integration: SelectedIntegration,

			// Just for visualizing the "URL not recognized" state, if the url
			// is 'http://invalid.com', set status to error.
			status: link === 'http://invalid.com' ? 'error' : 'resolving',

			// These would typically come from the integration page's title?
			// I guess after the integration link is resolved/validated by the backend.
			resolvedTitle: 'DSN-556',
			resolvedSubtitle: 'Design Spec',
		});

		// Close the Link Input dropdown.
		setLinkInputOpen(false);

		// Reset selected integration.
		setSelectedIntegration(undefined);
	};

	return (
		<>
			<div className={styles.wrapper}>
				<span className={styles.label}>Integrations</span>
				<div>
					{addedIntegrations.length > 0 && (
						<AddedIntegrationsList added={addedIntegrations} />
					)}
					{!SelectedIntegration && (
						<Button
							title="Add"
							icon={<AddIcon />}
							onClick={toggleDropDown}
							ref={addNewIntegrationButton}
						/>
					)}
					{SelectedIntegration && (
						<div className={styles.addingUrlWrapper}>
							<div className={styles.integrationLogo}>
								<SelectedIntegration.Logo
									className={styles.integrationLogo}
								/>
							</div>
							<Button
								title="..."
								variant="default"
								size="tiny"
								onClick={toggleLinkInput}
								ref={integrationInputButton}
							/>
						</div>
					)}
				</div>
			</div>
			<IntegrationDropdown
				open={dropdownOpen}
				onClose={() => setDropdownOpen(false)}
				position={position}
				parentRef={addNewIntegrationButton}
				setSelectedIntegration={setSelectedIntegration}
			/>
			<LinkInput
				title={SelectedIntegration?.title || ''}
				open={linkInputOpen}
				position={linkInputPosition}
				parentRef={integrationInputButton}
				onSubmit={handleNewIntegration}
				onClose={() => setLinkInputOpen(false)}
			/>
		</>
	);
};

export default IntegrationInput;
