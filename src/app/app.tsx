import styles from './app.module.css';
import { IntegrationInput } from './components/integrationInput';

export function App() {
	return (
		<div className={styles.wrapper}>
			<IntegrationInput />
		</div>
	);
}

export default App;
