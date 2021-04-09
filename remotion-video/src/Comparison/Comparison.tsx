import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {ComparisonItemModel} from './ComparisonItemModel';
import {Headline} from './Headline';
import {Lines} from './Lines';
import {Section} from './Section';

interface ComparisonSectionModel {
	name: string;
	items: Array<ComparisonItemModel>;
}

export const Comparison: React.FC<{
	leftPlayerImage: string;
	rightPlayerImage: string;
	leftPlayerName: string;
	rightPlayerName: string;
	comparisonSections: Array<ComparisonSectionModel>;
}> = ({leftPlayerImage, rightPlayerImage, leftPlayerName, rightPlayerName, comparisonSections}) => {
	const {durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const opacity = interpolate(
		frame,
		[durationInFrames - 30, durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	const firstSectionStart = 90;
	const sectionDuration = 1350;

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: '#fff',
				opacity,
			}}
		>
			<Sequence from={25} durationInFrames={durationInFrames}>
				<Headline
					leftPlayerImage={leftPlayerImage}
					leftPlayerName={leftPlayerName}
					rightPlayerImage={rightPlayerImage}
					rightPlayerName={rightPlayerName}
				/>
			</Sequence>

			<Sequence from={25} durationInFrames={durationInFrames}>
				<Lines />
			</Sequence>

			{comparisonSections.map((section, index) => (
				<Sequence
					from={firstSectionStart + sectionDuration * index}
					durationInFrames={sectionDuration}
				>
					<Section name={section.name} items={section.items} />
				</Sequence>
			))}
		</div>
	);
};
