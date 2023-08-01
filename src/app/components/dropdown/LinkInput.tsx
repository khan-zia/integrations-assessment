import { useEffect, useRef, useState } from 'react';
import styles from './LinkInput.module.css';
import Dropdown, { BaseDropdownProps } from './Dropdown';
import { TextField } from '../textField';
import Button from '../button';

type LinkInputProps = BaseDropdownProps & {
	/**
	 * The title displayed on the dropdown e.g. "Linear ticket"
	 */
	title: string;

	/**
	 * Callback triggered by the component when the user enters a valid URL.
	 *
	 * @param link The link entered by the user.
	 */
	onSubmit: (link: string) => void;
};

const LinkInput = (props: LinkInputProps): JSX.Element => {
	const { title, open, position, parentRef, onSubmit, onClose } = props;
	const [url, setUrl] = useState<string>('');
	const [invalidUrl, setInvalidUrl] = useState<undefined | string>(undefined);
	const textFieldRef = useRef<HTMLInputElement>(null);

	// When the LinkInput is opened, put its input field in focus.
	useEffect(() => {
		if (open && textFieldRef.current) {
			textFieldRef.current.focus();
		}
	}, [open, textFieldRef]);

	const handleSubmit = () => {
		// Validate the url. Must be an http URL.
		try {
			const newUrl = new URL(url);
			if (
				!(newUrl.protocol === 'http:' || newUrl.protocol === 'https:')
			) {
				setInvalidUrl(url);
				return;
			}

			// Reset local url and submit.
			onSubmit(url);
			setUrl('');
		} catch (exception) {
			// URL must have been invalid. Mark it as such.
			setInvalidUrl(url);
		}
	};

	return (
		<Dropdown
			open={open}
			onClose={onClose}
			position={position}
			parentRef={parentRef}
		>
			<div className={styles.linkInput}>
				<div className={styles.linkInputArrow}></div>
				<div className={styles.linkInputTitle}>{title}</div>
				<div className={styles.linkInputField}>
					<TextField
						placeholder="Paste link https://..."
						value={url}
						setValue={setUrl}
						variant={
							invalidUrl && invalidUrl === url
								? 'danger'
								: 'default'
						}
						ref={textFieldRef}
						onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
					/>
					<Button
						title="Link"
						disabled={url === ''}
						onClick={handleSubmit}
					/>
				</div>
			</div>
		</Dropdown>
	);
};

export default LinkInput;
