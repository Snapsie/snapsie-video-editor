import TimelineLayer from 'renderer/interfaces/timeline_layer';
import VideoTimeline from './VideoTimeline';

interface TimelineLayerProps {
  layer: TimelineLayer;
}

function TimelineLayerComponent({ layer }: TimelineLayerProps) {
  return (
    <div>
      <VideoTimeline />
    </div>
  );
}

export default TimelineLayerComponent;
