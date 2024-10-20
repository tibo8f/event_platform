// UploadThings Create a Next.js API route using the FileRouter see docs : https://v6.docs.uploadthing.com/getting-started/appdir

import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});