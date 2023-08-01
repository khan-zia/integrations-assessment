import { useEffect, useState } from 'react';

const LinearLogo = (
	props: React.SVGProps<SVGSVGElement>,
): JSX.Element | false => {
	const [ids, setIds] = useState<string[] | undefined>(undefined);

	// Generate unique IDs for the SVG's elements.
	// This is only required by HTML. This allows for displaying
	// the same SVG multiple times within the same document without affecting
	// other SVGs.
	useEffect(() => {
		// We need 7 unique IDs for Linear's logo.
		// No need for UUIDs or any more computationally expensive operation
		// than a simple Math.random().
		const randomString = Math.random().toString();
		setIds([
			`${randomString}1`,
			`${randomString}2`,
			`${randomString}3`,
			`${randomString}4`,
			`${randomString}5`,
			`${randomString}6`,
			`${randomString}7`,
		]);
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
				<g clipPath={`url(#${ids[6]})`}>
					<path
						d="M0.125 0.125H23.875V23.875H0.125V0.125Z"
						fill={`url(#${ids[1]})`}
						stroke="#455A79"
						strokeWidth="0.25"
					/>
					<g filter={`url(#${ids[0]})`}>
						<path
							d="M4.68372 13.7285C4.65035 13.5862 4.81984 13.4966 4.9232 13.5999L10.4 19.0768C10.5034 19.1801 10.4138 19.3496 10.2715 19.3162C7.50765 18.6679 5.33209 16.4923 4.68372 13.7285Z"
							fill={`url(#${ids[2]})`}
						/>
						<path
							d="M4.50029 11.5334C4.49762 11.5759 4.51362 11.6174 4.54371 11.6474L12.3526 19.4563C12.3826 19.4864 12.4241 19.5024 12.4666 19.4997C12.822 19.4776 13.1707 19.4307 13.511 19.3608C13.6257 19.3373 13.6655 19.1964 13.5827 19.1136L4.88639 10.4173C4.8036 10.3345 4.66271 10.3743 4.63915 10.489C4.56928 10.8293 4.52241 11.178 4.50029 11.5334Z"
							fill={`url(#${ids[3]})`}
						/>
						<path
							d="M5.13157 8.95584C5.10661 9.01191 5.11932 9.07742 5.16271 9.12081L14.8791 18.8372C14.9225 18.8806 14.988 18.8933 15.0441 18.8684C15.312 18.7491 15.5717 18.6145 15.8219 18.4658C15.9048 18.4166 15.9175 18.3028 15.8494 18.2347L5.76529 8.15052C5.69717 8.08241 5.58338 8.09518 5.53416 8.178C5.38545 8.42826 5.25089 8.68792 5.13157 8.95584Z"
							fill={`url(#${ids[4]})`}
						/>
						<path
							d="M6.39883 7.21111C6.34332 7.15559 6.33986 7.06652 6.39218 7.00799C7.76694 5.46891 9.76672 4.5 11.9928 4.5C16.1389 4.5 19.5 7.86109 19.5 12.0072C19.5 14.2333 18.5311 16.2331 16.992 17.6078C16.9335 17.6602 16.8444 17.6567 16.7889 17.6012L6.39883 7.21111Z"
							fill={`url(#${ids[5]})`}
						/>
					</g>
				</g>
				<defs>
					<filter
						id={ids[0]}
						x="-40.0545"
						y="-33.0928"
						width="104.109"
						height="104.109"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="6.96163" />
						<feGaussianBlur stdDeviation="22.2772" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.118924 0 0 0 0 0.158031 0 0 0 0 0.570833 0 0 0 0.7 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_158_307"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="2.43657" />
						<feGaussianBlur stdDeviation="9.37501" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"
						/>
						<feBlend
							mode="normal"
							in2="effect1_dropShadow_158_307"
							result="effect2_dropShadow_158_307"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect2_dropShadow_158_307"
							result="shape"
						/>
					</filter>
					<linearGradient
						id={ids[1]}
						x1="12"
						y1="0"
						x2="12"
						y2="24"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#5C6BF1" />
						<stop offset="1" stopColor="#283188" />
					</linearGradient>
					<linearGradient
						id={ids[2]}
						x1="5.03564"
						y1="5.89288"
						x2="12.8571"
						y2="17.3572"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="white" />
						<stop offset="1" stopColor="white" stopOpacity="0.65" />
					</linearGradient>
					<linearGradient
						id={ids[3]}
						x1="5.03572"
						y1="5.89286"
						x2="12.8571"
						y2="17.3571"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="white" />
						<stop offset="1" stopColor="white" stopOpacity="0.65" />
					</linearGradient>
					<linearGradient
						id={ids[4]}
						x1="5.03565"
						y1="5.89288"
						x2="12.8571"
						y2="17.3572"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="white" />
						<stop offset="1" stopColor="white" stopOpacity="0.65" />
					</linearGradient>
					<linearGradient
						id={ids[5]}
						x1="5.03574"
						y1="5.89286"
						x2="12.8572"
						y2="17.3571"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="white" />
						<stop offset="1" stopColor="white" stopOpacity="0.65" />
					</linearGradient>
					<clipPath id={ids[6]}>
						<rect width="24" height="24" rx="4" fill="white" />
					</clipPath>
				</defs>
			</svg>
		);
	}

	return false;
};

export default LinearLogo;
