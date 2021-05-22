import { registerRoot, Composition } from 'remotion';
import { Video } from './Video';
import players from './assets/players-data.json';

const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="Video"
        component={Video}
        durationInFrames={9300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ players }}
      />
    </>
  );
};

registerRoot(RemotionVideo);
