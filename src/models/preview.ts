import express from "express";
import { WebSocketServer } from "ws";
import ZidAPI from "../helper/zidAPI";
import zip_theme from "../helper/zip_theme";
import logger from "../console/logger";

const preview = async (
  store_email: string,
  code?: string,
  url?: string
): Promise<void> => {
  logger.log(`preview command called with store_email: ${store_email}`);
  if (code) {
    logger.log(`theme code: ${code}`);
  }

  const isValidStore = await validateDevStore(store_email);
  if (!isValidStore) {
    return;
  }

  // build theme in the current dir.
  const currentDir = process.cwd();

  // TODO: change to current path only instead of `/theme`
  await zip_theme(currentDir + "/theme", currentDir);

  // upload the theme to the store
  const themePath = currentDir + "/theme.zip";

  const ss = await ZidAPI.uploadTheme(store_email, themePath, code);

  logger.log(ss["message"]["description"]);

  if (ss["message"]["description"] === "Success" && url) {
    const app = express();
    const server = app.listen(4446, () => {
      logger.log(`WebSocket server running at ws://localhost:4446`);
    });

    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
      logger.log("WebSocket connection established.");
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("reload");
      }
    });

    setTimeout(() => {
      server.close();
      logger.log("WebSocket server closed.");
    }, 5000); // Close the server after 5 seconds
  }
};

export default preview;

const validateDevStore = async (store_email: string): Promise<boolean> => {
  try {
    let devStores = await ZidAPI.getDevStores();
    const devStore = devStores.payload.find(
      (devStore) => devStore.email === store_email
    );
    if (!devStore) {
      logger.error(`Dev store with email ${store_email} not found`);
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
