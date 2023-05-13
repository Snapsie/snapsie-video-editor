import { useDrag } from 'react-dnd';
import VideoTimeline from './VideoTimeline';

const DRAG_TYPE = 'VideoTimeline';

interface VideoTimelineDraggableProps {
  title: string;
  timelineId: number;
}

function VideoTimelineDraggable({
  title,
  timelineId,
}: VideoTimelineDraggableProps) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: DRAG_TYPE, timelineId },
    type: DRAG_TYPE, // add the type property
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const colors = [
    'bg-slate-300',
    'bg-gray-300',
    'bg-red-300',
    'bg-yellow-300',
    'bg-green-300',
    'bg-blue-300',
    'bg-indigo-300',
    'bg-purple-300',
    'bg-pink-300',
  ];

  function getRandomElement(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <VideoTimeline title={title} color={getRandomElement(colors)} />
    </div>
  );
}

export default VideoTimelineDraggable;
