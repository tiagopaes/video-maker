import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {ComparisonItemModel} from './ComparisonItemModel';
import {ComparisonValue} from './ComparisonValue';

export const ComparisonItem: React.FC<{
	itemInfo: ComparisonItemModel;
	topPosition: string;
	color: string;
	transitionStart: number;
}> = ({itemInfo, topPosition, color, transitionStart}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const {
		itemName,
		leftItemValue,
		rightItemValue,
	} = itemInfo;

	const opacity = interpolate(
		frame,
		[transitionStart, transitionStart + 30],
		[0, 1]
	);

	return (
		<div
			style={{
				left: '50px',
				right: '50px',
				position: 'absolute',
				top: topPosition,
				height: '80px',
				display: 'flex',
				flex: 1,
				justifyContent: 'space-between',
				alignItems: 'center',
				fontSize: 52,
				fontFamily: 'Helvetica, Arial',
				fontWeight: 'bold',
				paddingLeft: '20px',
				paddingRight: '20px',
				color,
			}}
		>
			<div style={{width: '630px', position: 'relative'}}>
				<Sequence
					from={transitionStart + 60}
					durationInFrames={durationInFrames}
				>
					<ComparisonValue value={leftItemValue} />
				</Sequence>
			</div>
			<div style={{opacity}}>{itemName}:</div>
			<div style={{width: '630px', position: 'relative'}}>
				<Sequence
					from={transitionStart + 120}
					durationInFrames={durationInFrames}
				>
					<ComparisonValue value={rightItemValue} />
				</Sequence>
			</div>
		</div>
	);
};
