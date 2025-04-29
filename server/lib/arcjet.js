import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";

//initialize arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    //shield protects application from common attacks eg:sql injection ,XSS,CRSF attacks
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE",
      allow: [
        //blocks all bots except search engine see full bots list in https://arcjet.com/bot-list
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),
    tokenBucket({ mode: "LIVE", refillRate: 5, interval: 10, capacity: 20 }),
  ],
});
