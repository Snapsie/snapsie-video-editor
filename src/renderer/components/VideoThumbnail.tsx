import {
  EXTRACT_VIDEO_NON_BLACK_THUMBNAIL,
  generateMessageChannel,
} from 'consts';
import { useEffect, useState } from 'react';
import { AiFillDelete, AiFillPlusCircle } from 'react-icons/ai';
import Video from 'renderer/interfaces/video';

interface VideoThumbnailProps {
  video: Video;
  onDelete: () => void;
}

function VideoThumbnail({ video, onDelete }: VideoThumbnailProps) {
  const [showIcons, setShowIcons] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState<Blob | null>(null);

  const handleMouseEnter = () => {
    setShowIcons(true);
  };

  const handleMouseLeave = () => {
    setShowIcons(false);
  };

  useEffect(() => {
    async function fetchThumbnail() {
      window.electron.IPCRenderer.sendMessage(
        EXTRACT_VIDEO_NON_BLACK_THUMBNAIL,
        {
          videoPath: video.file.path,
          videoId: video.id,
        }
      );

      const unsubscribe = window.electron.IPCRenderer.on(
        generateMessageChannel(EXTRACT_VIDEO_NON_BLACK_THUMBNAIL, video.id),
        (args: unknown) => {
          const { thumbnailBuffer, thumbnailFormat } = args as {
            thumbnailBuffer: any;
            thumbnailFormat: any;
          };
          const blob = new Blob([thumbnailBuffer], { type: thumbnailFormat });
          setVideoThumbnail(blob);
        }
      );

      return () => {
        unsubscribe();
      };
    }
    fetchThumbnail();
    // Clean up the event listener when the component unmounts
  }, [video]);

  const thumbnailAlt = `${video.file.name} thumbnail`;

  return (
    <div
      className="border border-gray-300 rounded p-2 w-full h-24 relative flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-24 h-full overflow-hidden rounded">
        {videoThumbnail && (
          <img
            className="w-full h-full object-cover"
            src={videoThumbnail ? URL.createObjectURL(videoThumbnail) : ''}
            alt={thumbnailAlt}
          />
        )}
      </div>
      <div className="mt-2 text-left">
        <div className="text-sm truncate font-semibold text-gray-600">
          {video.file.name}
        </div>
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          showIcons ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-black bg-opacity-50 flex items-center justify-center w-full h-full rounded gap-8">
          <button type="button" className="mr-2" onClick={onDelete}>
            <AiFillDelete className="text-red-500" size={25} />
          </button>
          <button type="button">
            <AiFillPlusCircle className="text-green-500" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoThumbnail;
