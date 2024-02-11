import { createRouteHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "@/server/uploadthing";

 
process.env.UPLOADTHING_APP_ID
export default createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: "https://uploadthing.com/dashboard/3kkrc88mm0",
    uploadthingId: "5n36cy6dw0",
    uploadthingSecret: "sk_live_9e951ffda034a5bd65747a80b14731ad26dc00d030c2da0d1190285a6a926cb3", 
    isDev: true,

  }
});
