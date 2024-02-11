import { createRouteHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "@/server/uploadthing";

 
process.env.UPLOADTHING_APP_ID
export default createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: "https://uploadthing.com/dashboard/5n36cy6dw0",
    uploadthingId: "5n36cy6dw0",
    uploadthingSecret: "sk_live_5217d46656f83f81f0a37c69a37489b5836faf31070a5bb5bb8b871fd0030f03", 
    isDev: true,

  }
});
