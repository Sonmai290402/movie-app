import { Webhook } from "svix";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";

export async function webhooks(req, res) {
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;
    const wh = new Webhook(ENV_VARS.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payloadString, svixHeaders);
    const { id, ...attributes } = evt.data;

    const eventType = evt.type;
    if (eventType === "user.created") {
      const firstName = attributes.first_name;
      const lastName = attributes.last_name;

      console.log(firstName);

      const user = new User({
        id: id,
        firstName: firstName,
        lastName: lastName,
      });

      await user.save();
      console.log("User is created");
      // console.log(`User ${id} is ${eventType}`);
      // console.log(attributes);
    }

    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
