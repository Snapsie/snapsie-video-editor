import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Video from 'renderer/interfaces/video';
import VideoThumbnail from './VideoThumbnail';

function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Handle file select');
    if (e.target.files === null) return;

    const file = e.target.files[0];
    const newVideo = {
      id: uuid(),
      file,
    };
    setVideos((prevVideos: Video[]) => [...prevVideos, newVideo]);
  };

  const handleDelete = (id: string) => {
    setVideos((prevVideos: Video[]) =>
      prevVideos.filter((video: Video) => video.id !== id)
    );
  };

  return (
    <div className="h-full w-full flex flex-col justify-end">
      <div className="flex flex-wrap p-2 gap-2">
        {videos.map((video) => (
          <VideoThumbnail
            key={video.id}
            video={video}
            onDelete={() => handleDelete(video.id)}
          />
        ))}
      </div>

      <hr className="border-slate-600 mb-2" />
      <span className="sr-only">Upload Video</span>
      <input
        type="file"
        accept="video/*"
        className="mx-2 my-2 block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
        onChange={handleFileSelect}
      />
    </div>
  );
}

export default VideoList;
