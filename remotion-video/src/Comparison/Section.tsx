import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ComparisonItem} from './ComparisonItem';
import {ComparisonItemModel} from './ComparisonItemModel';
import {lineColors, linePositions, lineStartFrames} from './static';

export const Section: React.FC<{
	name: string;
	items: Array<ComparisonItemModel>;
}> = ({name, items}) => {
	const {durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 80], [0, 1]);
	const generalOpacity = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				opacity: generalOpacity,
			}}
		>
			<div
				style={{
					color: '#000',
					fontSize: 62,
					fontFamily: 'Helvetica, Arial',
					fontWeight: 'bold',
					textAlign: 'center',
					position: 'absolute',
					width: '900px',
					height: '120px',
					top: '350px',
					left: '50%',
					marginLeft: '-450px',
					opacity,
				}}
			>
				{name}
			</div>

			{items.map((item, index) => (
				<ComparisonItem
					key={index}
					itemInfo={item}
					topPosition={linePositions[index]}
					color={lineColors[index]}
					transitionStart={lineStartFrames[index]}
				/>
			))}
		</div>
	);
};
