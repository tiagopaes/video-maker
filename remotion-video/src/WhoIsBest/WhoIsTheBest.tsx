import {
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const WhoIsTheBest: React.FC<{
  leftPlayerImage: string;
	rightPlayerImage: string;
}> = ({leftPlayerImage, rightPlayerImage}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const opacity = interpolate(frame, [0, 25], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const scale = spring({
		fps,
		from: 0,
		to: 1,
		frame,
	});

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: '#171717',
				opacity,
			}}
		>
			<Img
				style={{
					transform: `scale(${scale})`,
					width: '300px',
          height: '300px',
          top: '30px',
          left: '50%',
          marginLeft: '-150px',
          position: 'absolute'
				}}
				src={require('./../assets/logo-white-200x200.png')}
			/>
			<div
				style={{
					position: 'absolute',
					top: '380px',
					fontSize: 100,
					fontFamily: 'Helvetica, Arial',
					fontWeight: 'bold',
					color: 'white',
					textAlign: 'center',
					left: '50%',
					marginLeft: '-475px',
					width: '950px',
				}}
			>
				WHO IS THE BEST?
			</div>
			<div
				style={{
					position: 'absolute',
					top: '550px',
					fontSize: 70,
					fontFamily: 'Helvetica, Arial',
					fontWeight: 'bold',
					color: 'white',
					textAlign: 'center',
					left: '50%',
					marginLeft: '-400px',
					width: '800px',
				}}
			>
				Leave a comment!!!
			</div>

			<div
				style={{
					position: 'absolute',
					top: '800px',
					fontSize: 50,
					fontFamily: 'Helvetica, Arial',
					fontWeight: 'bold',
					color: 'white',
					textAlign: 'center',
					left: '50%',
					marginLeft: '-800px',
					width: '1600px',
				}}
			>
				Don't forget to subscribe to our channel to watch the next videos!!!
			</div>
			<div
				style={{
					position: 'absolute',
					top: '200px',
					width: '100%',
					height: '300px',
					display: 'flex',
					paddingLeft: '150px',
					paddingRight: '150px',
					flex: 1,
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Img
					style={{
						transform: `scale(${scale})`,
						borderRadius: '50%',
						width: '300px',
						height: '300px',
					}}
					src={leftPlayerImage}
				/>

				<Img
					style={{
						transform: `scale(${scale})`,
						borderRadius: '50%',
						width: '300px',
						height: '300px',
					}}
					src={rightPlayerImage}
				/>
			</div>
		</div>
	);
};
