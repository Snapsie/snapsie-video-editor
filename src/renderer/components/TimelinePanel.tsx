import { useState } from 'react';
import { BiCut, BiDuplicate, BiMinus, BiPlus } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import TimeIntervals from './TimeIntervals';
import TimelineLayers from './TimelineLayers';

function TimelinePanel() {
  const [timelineScale, setTimelineScale] = useState(50);
  const initialTimeIntervals = 120; // 2 minutes
  const steps = 3; // 3 seconds each
  const initialTimelineLayers = 2;

  return (
    <div className="h-full w-full flex flex-col justify-start">
      {/* Panel Top with time & buttons */}
      <div
        className="
        h-12
        w-full
        flex
        flex-row
        items-center
        justify-between
        border-b
        border-t
        border-gray-400
        border-opacity-50
        text-black"
      >
        <div className="px-2 flex">
          <div className="flex justify-between items-center border border-blue-700 text-blue-700 rounded px-3 py-1 cursor-pointer hover:text-white hover:bg-blue-700">
            <BiCut className="text-xl" size={24} />
            <div className="text-sm">Split</div>
          </div>
          <div className="ml-3 flex justify-between items-center border border-blue-700 text-blue-700 rounded px-3 py-1 cursor-pointer hover:text-white hover:bg-blue-700">
            <MdDelete className="text-xl" size={24} />
            <div className="text-sm">Delete</div>
          </div>
          <div className="ml-3 flex justify-between items-center border border-blue-700 text-blue-700 rounded px-3 py-1 cursor-pointer hover:text-white hover:bg-blue-700">
            <BiDuplicate className="text-xl" size={24} />
            <div className="text-sm">Duplicate</div>
          </div>
        </div>
        <div className="text-sm">
          <span>00:04.97</span>
          <span className="mx-1">/</span>
          <span>00:35.26</span>
        </div>

        {/* Slider Code */}
        <div className="flex relative right-10 items-center">
          <BiMinus
            className="text-xs text-blue-700 cursor-pointer p-1"
            size={32}
          />
          <div>
            <div className="">
              <div className="relative flex items-center justify-center w-48 h-8 rounded-fullmr-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={timelineScale}
                  className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
                  onChange={(e) => {
                    setTimelineScale(parseInt(e.target.value, 10));
                  }}
                />
              </div>
            </div>
          </div>

          <BiPlus
            className="text-xs text-blue-700 cursor-pointer p-1"
            size={32}
          />
        </div>
      </div>

      {/* Time Interval Panel */}
      <div className="h-full w-full flex flex-col overflow-x-scroll overflow-y-hidden relative cursor-grab scrollWrapper border-b-2 scrollbar-hide">
        <TimeIntervals
          initialTimeIntervals={initialTimeIntervals}
          steps={steps}
        />
        {/* Timeline Layers */}
        <div
          className="h-full pt-4 overflow-x-hidden overflow-y-scroll scrollbar-hide"
          style={{ width: 'fit-content' }}
        >
          <TimelineLayers initialTimelineLayers={initialTimelineLayers} />
        </div>
      </div>
    </div>
  );
}

export default TimelinePanel;
