import {interpolate, useCurrentFrame} from 'remotion';

export const Subtitle: React.FC<{title: string;}> = ({title}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
	return (
		<div
			style={{
				fontFamily: 'Helvetica, Arial',
				fontSize: 40,
				textAlign: 'center',
				position: 'absolute',
				bottom: 250,
				width: '100%',
				opacity,
				color: 'white'
			}}
		>
			Palmeiras não tem mundial!
		</div>
	);
};
