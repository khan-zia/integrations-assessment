import { useEffect, useState } from 'react';

const MiroLogo = (
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
				<g clipPath={`url(#${ids[0]})`}>
					<path
						d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
						fill="#FFD02F"
					/>
					<path
						d="M16.354 3.20001H13.792L16.0665 6.72501L11.258 3.20001H8.69598L10.9705 7.81901L6.16198 3.20001H3.59998L5.83698 9.16301L3.59998 20.8H6.16198L10.9705 8.32251L8.69598 20.8H11.258L16.0665 7.22901L13.792 20.8H16.354L21.2 5.89251L16.354 3.20001Z"
						fill="#050038"
					/>
				</g>
				<defs>
					<clipPath id={ids[0]}>
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		);
	}

	return false;
};

export default MiroLogo;
