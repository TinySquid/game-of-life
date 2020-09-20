// indexDB wrapper
import Dexie from "dexie";

const indexDB = new Dexie("gol_presets");

indexDB.version(1).stores({
  presets: "++id",
});

export default indexDB;
