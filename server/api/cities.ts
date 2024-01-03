import fs from "fs";
import path from "path";

export default defineCachedEventHandler(
  (event) => {
    const pathToFile = path.resolve("assets/data/cities.json");
    const cities = fs.readFileSync(pathToFile, "utf-8");
    return JSON.parse(cities);
  },
  { swr: true }
);
