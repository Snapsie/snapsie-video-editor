interface TimeIntervalProps {
  timeInSecs: number;
}

function TimeInterval({ timeInSecs }: TimeIntervalProps) {
  function renderTimeAsString(timeBlock: number) {
    const minutes = Math.floor(timeBlock / 60);
    const seconds = timeBlock % 60;
    const hours = Math.floor(minutes / 60);
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');
    const paddedHours = hours.toString().padStart(2, '0');
    if (hours < 1) {
      return `${paddedMinutes}:${paddedSeconds}`;
    }
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return (
    <div
      className="h-1/2 flex justify-center border-l border-gray-400 timestampSegmentContainer relative flex-1"
      style={{ minWidth: '100px', maxWidth: '100px' }}
    >
      <span className="absolute left-1 bottom-1 text-xs text-black">
        {renderTimeAsString(timeInSecs)}
      </span>
      <div className="w-px border-l border-gray-400 h-1/2" />
    </div>
  );
}

export default TimeInterval;
