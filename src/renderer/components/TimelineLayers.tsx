import { useEffect, useState } from 'react';
import TimelineLayer from 'renderer/interfaces/timeline_layer';
import TimelineLayerComponent from './TimelineLayerComponent';

interface TimelineLayersProps {
  initialTimelineLayers: number;
}

function TimelineLayers({ initialTimelineLayers }: TimelineLayersProps) {
  const [timelineLayers, setTimelineLayers] = useState<TimelineLayer[] | null>(
    null
  );

  useEffect(() => {
    const layers = Array.from(
      { length: initialTimelineLayers },
      (_, index) => ({
        id: index + 1,
        title: `Layer ${index + 1}`,
      })
    );

    setTimelineLayers(layers);
  }, [initialTimelineLayers]);

  return (
    <div
      className="h-12 relative mt-2 layersContainer"
      style={{ width: '10106px' }}
    >
      {timelineLayers?.map((layer) => (
        <div className="h-24 z-auto" key={layer.id}>
          <TimelineLayerComponent layer={layer} />
        </div>
      ))}
    </div>
  );
}

export default TimelineLayers;
