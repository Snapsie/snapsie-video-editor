function arrayBufferToBlob(data: Buffer, format: string) {
  const uint8Array = new Uint8Array(data);
  const blob = new Blob([uint8Array], { type: format });
  return blob;
}

export default arrayBufferToBlob;
