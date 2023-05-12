const EXTRACT_VIDEO_NON_BLACK_THUMBNAIL = 'SEND_VIDEO_NON_BLACK_THUMBNAIL';
const EXTRACT_VIDEO_THUMBNAILS = 'EXTRACT_VIDEO_THUMBNAILS';
const EXTRACT_VIDEO_METADATA = 'EXTRACT_VIDEO_METADATA';

function generateMessageChannel(channel: string, arg: string | number) {
  return `${channel}-${arg}`;
}

export {
  EXTRACT_VIDEO_NON_BLACK_THUMBNAIL,
  EXTRACT_VIDEO_THUMBNAILS,
  EXTRACT_VIDEO_METADATA,
  generateMessageChannel,
};
