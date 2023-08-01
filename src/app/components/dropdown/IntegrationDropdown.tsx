import classNames from 'classnames';
import styles from './IntegrationDropdown.module.css';
import {
	AsanaLogo,
	FigmaLogo,
	LinearLogo,
	MiroLogo,
	NotionLogo,
} from '../logos';
import Dropdown, { BaseDropdownProps } from './Dropdown';

export type Integration = {
	id: number;

	/**
	 * Title of the integration displayed in the integrations dropdown menu.
	 */
	title: string;

	/**
	 * An SVG logo of the integration displayed in the integrations dropdown menu.
	 */
	Logo: React.FC<React.SVGProps<SVGSVGElement>>;

	/**
	 * Determines if the Integration should be disabled when displayed in the integrations
	 * dropdown menu.
	 */
	disabled: boolean;
};

const integrations: Integration[] = [
	{
		id: 1,
		title: 'Asana ticket',
		Logo: AsanaLogo,
		disabled: false,
	},
	{
		id: 2,
		title: 'Figma file',
		Logo: FigmaLogo,
		disabled: false,
	},
	{
		id: 3,
		title: 'Linear ticket',
		Logo: LinearLogo,
		disabled: false,
	},
	{
		id: 4,
		title: 'Miro board',
		Logo: MiroLogo,
		disabled: true,
	},
	{
		id: 5,
		title: 'Notion page',
		Logo: NotionLogo,
		disabled: false,
	},
];

type IntegrationDropdownProps = BaseDropdownProps & {
	setSelectedIntegration: React.Dispatch<
		React.SetStateAction<Integration | undefined>
	>;
};

const IntegrationDropdown = (props: IntegrationDropdownProps): JSX.Element => {
	const { open, onClose, position, parentRef, setSelectedIntegration } =
		props;

	const setIntegration = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		const integrationID: Integration['id'] = Number(
			e.currentTarget.dataset.integration,
		);
		setSelectedIntegration(
			integrations.find(
				(integration) => integration.id === integrationID,
			),
		);

		// Close the dropdown after an integration is selected.
		onClose();
	};

	return (
		<Dropdown
			open={open}
			onClose={onClose}
			position={position}
			parentRef={parentRef}
		>
			<div className={styles.dropdown}>
				<div className={styles.dropdownLabel}>Integration</div>
				{integrations.map((Integration) => (
					<div
						className={classNames(styles.dropdownItem, {
							[styles.dropdownItemDisabled]: Integration.disabled,
						})}
						key={Integration.id}
						data-integration={Integration.id}
						onClick={(e) =>
							Integration.disabled ? null : setIntegration(e)
						}
					>
						<Integration.Logo className={styles.dropdownItemLogo} />
						<span className={styles.dropdownItemLabel}>
							{Integration.title}
						</span>
					</div>
				))}
			</div>
		</Dropdown>
	);
};

export default IntegrationDropdown;
