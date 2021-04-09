import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Logo} from './Logo';

export const Intro: React.FC = () => {
	const videoConfig = useVideoConfig();
	const transitionStart = 25;
	const frame = useCurrentFrame();
	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<div style={{opacity}}>
			<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
				<Logo transitionStart={transitionStart} />
			</Sequence>
		</div>
	);
};
