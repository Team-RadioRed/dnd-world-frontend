const IMG_URL = import.meta.env.VITE_IMAGE_URL;

export function getImageServer(filePath, projectName = "worlds") {
  return `${IMG_URL}/${projectName}/${filePath}`;
}

export function getImageLocal(filePath) {
  return `/${filePath}`;
}
