import classNames from 'classnames';
import styles from './IntegrationUpdateDropdown.module.css';
import Dropdown, { BaseDropdownProps } from './Dropdown';
import { ReactComponent as ChangeIcon } from '../../../assets/icons/refresh-icon.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash-icon.svg';
import { AddedIntegration } from '../integrationInput/IntegrationInput';

type IntegrationUpdateAction = {
	/**
	 * Action identifier. Just a unique value to work with.
	 */
	id: number;

	/**
	 * Title of the action displayed in the dropdown menu. e.g. Change URL
	 */
	title: string;

	/**
	 * SVG icon of the action displayed in the dropdown menu.
	 */
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;

	/**
	 * Type of the action. This only determines the look (UI) of the action when displayed
	 * in the dropdown menu. e.g. the 'delete' type action will be red.
	 */
	type: 'mutate' | 'delete';

	/**
	 * Callback function to trigger when user clicks/presses the action from the dropdown menu.
	 *
	 * @param integration Instance of the integration on which the action should be performed.
	 */
	trigger: (integration: AddedIntegration) => void;
};

const changeIntegrationUrl = (integration: AddedIntegration) => {
	// We would trigger the UI and the rest of the process in a
	// setup like this method ...
	// Out of scope.

	console.log(`Change URL of integration: ${integration.id}`);
};

const deleteIntegration = (integration: AddedIntegration) => {
	// We would trigger the UI and the rest of the process in a
	// setup like this method ...
	// Out of scope.

	console.log(`Request deletion of integration: ${integration.id}`);
};

const updateActions: IntegrationUpdateAction[] = [
	{
		id: 1,
		title: 'Change URL',
		Icon: ChangeIcon,
		type: 'mutate',
		trigger: changeIntegrationUrl,
	},
	{
		id: 2,
		title: 'Delete integration',
		Icon: TrashIcon,
		type: 'delete',
		trigger: deleteIntegration,
	},
];

type IntegrationUpdateDropdownProps = BaseDropdownProps & {
	integration: AddedIntegration;
};

const IntegrationUpdateDropdown = (
	props: IntegrationUpdateDropdownProps,
): JSX.Element => {
	const { open, onClose, position, parentRef, integration } = props;

	return (
		<Dropdown
			open={open}
			onClose={onClose}
			position={position}
			parentRef={parentRef}
		>
			<div className={styles.dropdown}>
				<div className={styles.dropdownLabel}>
					{integration.integration.title.split(' ')[0]}
				</div>
				{updateActions.map((action) => (
					<div
						className={classNames(styles.dropdownItem, {
							[styles.dropdownItemDanger]:
								action.type === 'delete',
						})}
						key={action.id}
						onClick={() => {
							action.trigger(integration);
							onClose();
						}}
					>
						<action.Icon
							className={classNames({
								[styles.dangerIcon]: action.type === 'delete',
							})}
						/>
						<span className={styles.dropdownItemLabel}>
							{action.title}
						</span>
					</div>
				))}
			</div>
		</Dropdown>
	);
};

export default IntegrationUpdateDropdown;
