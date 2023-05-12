import { useEffect, useState } from 'react';
import TimeInterval from './TimeInterval';

interface TimeIntervalProps {
  initialTimeIntervals: number;
  steps: number;
}

function TimeIntervals({ initialTimeIntervals, steps }: TimeIntervalProps) {
  const [timeIntervals, setTimeIntervals] = useState<number[] | null>(null);

  function generateRange(start: number, end: number, step: number): number[] {
    const result: number[] = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }

  useEffect(() => {
    const generatedTimeIntervals = generateRange(
      0,
      initialTimeIntervals,
      steps
    );
    setTimeIntervals(generatedTimeIntervals);
  }, [initialTimeIntervals, steps]);

  if (!timeIntervals) {
    return null;
  }

  return (
    <div
      className="h-14 w-full border-opacity-50 flex border-b"
      style={{ height: '75px', width: '10000px' }}
    >
      {timeIntervals.map((timeInterval) => (
        <TimeInterval key={timeInterval} timeInSecs={timeInterval} />
      ))}
    </div>
  );
}

export default TimeIntervals;
