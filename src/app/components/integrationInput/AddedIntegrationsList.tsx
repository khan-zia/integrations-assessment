import { AddedIntegration } from './IntegrationInput';
import styles from './IntegrationInput.module.css';
import IntegrationsListItem from './IntegrationsListItem';

type AddedIntegrationsListProps = {
	/**
	 * The list of integration instances added by the user.
	 */
	added: AddedIntegration[];
};

const AddedIntegrationsList = (
	props: AddedIntegrationsListProps,
): JSX.Element => {
	const { added } = props;

	return (
		<div className={styles.addedIntegrationsWrapper}>
			{added.map((added) => (
				<IntegrationsListItem added={added} key={added.id} />
			))}
		</div>
	);
};

export default AddedIntegrationsList;
