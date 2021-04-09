import {useCurrentFrame, spring, interpolate, useVideoConfig, Img} from 'remotion';
import logoWhite from './../assets/logo-white-200x200.png';

export const Logo: React.FC<{
	transitionStart: number;
}> = ({transitionStart}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const opacity = interpolate(frame, [0, transitionStart], [0, 1], {extrapolateRight: 'clamp'});

	const scale = spring({
    fps,
    from: 0,
    to: 1,
    frame
  });

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#171717',
				opacity
			}}
		>
			<Img style={{transform: `scale(${scale})`}} width="700" height="700" src={logoWhite} />
		</div>
	);
};
