import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Video from 'renderer/interfaces/video';
import {
  STORE_ADD_VIDEO,
  VIDEO_STORE_CHANGED,
  STORE_GET_VIDEO_LIST,
} from 'consts';
import VideoThumbnail from './VideoThumbnail';

function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);

  window.electron.IPCRenderer.on(VIDEO_STORE_CHANGED, (args: unknown) => {
    const { new: newStore } = args as {
      old: unknown;
      new: [string, unknown][];
    };

    const newStoreEntries = Object.entries(newStore) as unknown as Array<
      [id: string, video: Video]
    >;

    const newVideos = newStoreEntries
      .filter(([id]) => !videos.some((v) => v.id === id))
      .map(([id, video]) => {
        return {
          id,
          path: video.path,
          filename: video.filename,
        };
      });

    if (newVideos.length > 0) {
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
    }
  });

  useEffect(() => {
    const unsubscribe = window.electron.IPCRenderer.on(
      STORE_GET_VIDEO_LIST,
      (args: unknown) => {
        const { videos: newVideos } = args as { videos: Video[] };
        const parsedVideos = Object.entries(newVideos)
          .filter(([id]) => !videos.some((v) => v.id === id))
          .map(([id, video]) => {
            return {
              id,
              path: video.path,
              filename: video.filename,
            };
          });
        setVideos(parsedVideos);
      }
    );

    window.electron.IPCRenderer.sendMessage(STORE_GET_VIDEO_LIST, {});

    return () => {
      unsubscribe();
    };
  }, [videos]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    const videoId = uuid();

    window.electron.IPCRenderer.sendMessage(STORE_ADD_VIDEO, {
      id: videoId,
      path: file.path,
      filename: file.path.split('/').pop(),
    });
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
