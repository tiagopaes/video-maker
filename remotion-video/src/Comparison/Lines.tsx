import {interpolate, useCurrentFrame} from 'remotion';
import {linePositions} from './static';

export const Lines: React.FC = () => {
	const frame = useCurrentFrame();

	const opacity = interpolate(frame, [0, 80], [0, 1]);

	return (
		<div
			style={{
				opacity,
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
		>
			{linePositions.map((position) => (
				<div
					style={{
						border: 'solid 3px #000',
						left: '50px',
						right: '50px',
						position: 'absolute',
						top: `${position}`,
						opacity,
					}}
				/>
			))}
		</div>
	);
};
