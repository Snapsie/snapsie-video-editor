import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';

import TimelineLayer from 'renderer/interfaces/timeline_layer';
import VideoTimelineDraggable from './VideoTimelineDraggable';

interface TimelineLayerProps {
  layer: TimelineLayer;
}

interface TimelineLayerDragItem {
  type: string;
  timelineId: string;
}

function TimelineLayerComponent({ layer }: TimelineLayerProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'VideoTimeline',
    drop: (item: TimelineLayerDragItem) => {
      console.log(`Dropped timeline ${item.timelineId} onto layer ${layer.id}`);
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const title = uuid();

  return (
    <div ref={drop} className={isOver ? 'bg-slate-950' : ''}>
      <VideoTimelineDraggable title={title} timelineId={layer.id} />
    </div>
  );
}

export default TimelineLayerComponent;
