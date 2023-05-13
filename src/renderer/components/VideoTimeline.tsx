import { useState } from 'react';
import { BiVideo } from 'react-icons/bi';

interface VideoTimelineProps {
  title: string;
  color: string;
}

function VideoTimeline({ title, color }: VideoTimelineProps) {
  const [isSelected, setIsSelected] = useState(false);

  if (isSelected) {
    return (
      <button
        type="button"
        className={`h-12 rounded cursor-move absolute border-t-4 border-b-4 border-transparent overflow-x-hidden layer-element shadow-md baseLayer ${color} border-yellow-300`}
        style={{ width: '1082.67px', transform: 'translate3d(32px, 0px, 0px)' }}
        onClick={() => setIsSelected(!isSelected)}
      >
        <div className="absolute left-0 h-full top-0 w-4 cursor-move-x z-10 resize-handle bg-yellow-300" />
        <div
          className="h-full absolute sizePreserver bg-no-repeat bg-cover"
          style={{ width: '1082.67px', right: 'unset', left: '0px' }}
        />
        <div className="w-full h-full contentContainer px-6 flex items-center">
          <div className="flex items-center justify-center h-full">
            <BiVideo className="mr-2 text-lg" />
            <div className="text-xs font-bold whitespace-nowrap">{title}</div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-4 cursor-move-x z-10 resize-handle bg-yellow-300" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`h-12 rounded cursor-move absolute border-t-4 border-b-4 border-transparent overflow-x-hidden layer-element shadow-md baseLayer ${color}`}
      style={{ width: '1082.67px', transform: 'translate3d(32px, 0px, 0px)' }}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div className="absolute left-0 h-full top-0 w-4 cursor-move-x z-10 resize-handle bg-yellow-300 hidden" />
      <div
        className="h-full absolute sizePreserver bg-no-repeat bg-cover"
        style={{ width: '1082.67px', right: 'unset', left: '0px' }}
      />
      <div className="w-full h-full contentContainer px-6 flex items-center">
        <div className="flex items-center justify-center h-full">
          <BiVideo className="mr-2 text-lg" size={32} />
          <div className="text-xs font-bold whitespace-nowrap">{title}</div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-4 cursor-move-x z-10 resize-handle bg-yellow-300 hidden" />
    </button>
  );
}

export default VideoTimeline;
