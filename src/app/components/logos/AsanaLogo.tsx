import { useEffect, useState } from 'react';

const AsanaLogo = (
	props: React.SVGProps<SVGSVGElement>,
): JSX.Element | false => {
	const [ids, setIds] = useState<string[] | undefined>(undefined);

	// Generate unique IDs for the SVG's elements.
	useEffect(() => {
		// We only need one ID for this logo.
		setIds([Math.random().toString()]);
	}, []);

	// Render only when the required element IDs are ready.
	if (ids) {
		return (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<g>
					<path
						d="M18.7807 12.4951C15.8976 12.4951 13.5608 14.8319 13.5608 17.7145C13.5608 20.5973 15.8976 22.9346 18.7807 22.9346C21.6633 22.9346 24 20.5973 24 17.7145C24 14.8319 21.6633 12.4951 18.7807 12.4951V12.4951ZM5.21959 12.4954C2.337 12.4956 0 14.8319 0 17.7147C0 20.5973 2.337 22.9343 5.21959 22.9343C8.1024 22.9343 10.4394 20.5973 10.4394 17.7147C10.4394 14.8319 8.1024 12.4954 5.21933 12.4954H5.21959V12.4954ZM17.2196 5.97063C17.2196 8.85321 14.8829 11.1907 12.0003 11.1907C9.1172 11.1907 6.78043 8.85321 6.78043 5.97063C6.78043 3.08804 9.1172 0.751038 12.0002 0.751038C14.8828 0.751038 17.2193 3.08804 17.2193 5.97063H17.2196Z"
						fill={`url(#${ids[0]}`}
					/>
				</g>
				<defs>
					<radialGradient
						id={ids[0]}
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(12.0033 12.8886) scale(15.912 14.7077)"
					>
						<stop stopColor="#FFB900" />
						<stop offset="0.6" stopColor="#F95D8F" />
						<stop offset="0.999" stopColor="#F95353" />
					</radialGradient>
				</defs>
			</svg>
		);
	}

	return false;
};

export default AsanaLogo;
