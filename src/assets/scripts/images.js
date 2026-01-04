import { IMG_URL } from "@/storage/constants";

export function getImageServer(filePath, projectName = "worlds") {
  return `${IMG_URL}/${projectName}/${filePath}`;
}

export function getImageLocal(filePath) {
  return `/${filePath}`;
}
