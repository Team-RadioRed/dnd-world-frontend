import { IMG_URL } from "@/storage/constants";

const LOCAL_PATH = "../images";

export function getImageServer(filePath, projectName = "worlds") {
  return `${IMG_URL}/${projectName}/${filePath}`;
}

export function getImageLocal(filePath) {
  return new URL(`${LOCAL_PATH}/${filePath}`, import.meta.url).href;
}
