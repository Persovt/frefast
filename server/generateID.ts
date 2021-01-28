import { deflate } from "zlib";

import { v4 as uuidv4 } from "uuid";
import ShopIDShema from "./module/shopId.module";

const generateId = async () => {
  const refreshToken = uuidv4();
  const candidat = await ShopIDShema.find();

  if (!candidat.length) {
    new ShopIDShema({ ShopID: refreshToken }).save();
  }
};

export default generateId;
