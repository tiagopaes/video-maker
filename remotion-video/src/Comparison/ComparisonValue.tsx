import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const ComparisonValue: React.FC<{value: string}> = ({value}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<span
			style={{
				width: '630px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: value.length > 25 ? 34 : 52
			}}
		>
			{value.split('').map((t, i) => {
				return (
					<span
						key={i}
						style={{
							whiteSpace: 'pre',
							transform: `scale(${spring({
								fps,
								frame: frame - i * 5,
								config: {
									damping: 100,
									stiffness: 200,
									mass: 0.5,
								},
							})})`,
							display: 'inline-block',
						}}
					>
						{t}
					</span>
				);
			})}
		</span>
	);
};
