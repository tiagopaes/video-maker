import {
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const Headline: React.FC<{
	leftPlayerImage: string;
	rightPlayerImage: string;
	leftPlayerName: string;
	rightPlayerName: string;
}> = ({leftPlayerImage, rightPlayerImage, leftPlayerName, rightPlayerName}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const scale = spring({
		fps: videoConfig.fps,
		from: 0,
		to: 1,
		frame,
	});
	const opacity = interpolate(frame, [0, 40], [0, 1]);

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
		>
			<div
				style={{
					transform: `scale(${scale})`,
					color: '#000',
					fontSize: 100,
					fontFamily: 'Helvetica, Arial',
					fontWeight: 'bold',
					textAlign: 'center',
					position: 'absolute',
					width: '600px',
					height: '120px',
					top: '40px',
					left: '50%',
					marginLeft: '-300px',
				}}
			>
				Comparison
			</div>

			<div
				style={{
					transform: `scale(${scale})`,
					color: '#000',
					fontSize: 90,
					fontFamily: 'Helvetica, Arial',
					fontWeight: 'bold',
					textAlign: 'center',
					position: 'absolute',
					width: '1000px',
					top: '180px',
					left: '50%',
					marginLeft: '-500px',
				}}
			>
				Vs
			</div>

			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					opacity,
					width: '600px',
					height: '400px',
					display: 'flex',
					flex: 1,
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Img
					style={{
						marginTop: '30px',
						borderRadius: '50%',
					}}
					width="280"
					height="280"
					src={leftPlayerImage}
				/>
				<div
					style={{
						marginTop: '20px',
						color: '#000',
						fontSize: 48,
						fontFamily: 'Helvetica, Arial',
						fontWeight: 'bold',
					}}
				>
					{leftPlayerName}
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					right: 0,
					top: 0,
					opacity,
					width: '600px',
					height: '400px',
					display: 'flex',
					flex: 1,
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Img
					style={{
						marginTop: '30px',
						borderRadius: '50%',
					}}
					width="280"
					height="280"
					src={rightPlayerImage}
				/>
				<div
					style={{
						marginTop: '20px',
						color: '#000',
						fontSize: 48,
						fontFamily: 'Helvetica, Arial',
						fontWeight: 'bold',
					}}
				>
					{rightPlayerName}
				</div>
			</div>
		</div>
	);
};
