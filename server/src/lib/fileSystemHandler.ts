import { unlink } from "fs";

export function deleteOldProfilePic(imageUrl: string) {
  unlink("./images/" + imageUrl, (err) => {});
}
