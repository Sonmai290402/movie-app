import { Webhook } from "svix";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";

export async function webhooks(req, res) {
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(ENV_VARS.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payloadString, svixHeaders);

    const { id, first_name, last_name, email_addresses } = evt.data;

    const eventType = evt.type;

    if (eventType === "user.created") {
      const user = new User({
        clerkId: id,
        email: email_addresses[0].email_address,
        username:
          first_name + " " + last_name || email_addresses[0].email_address,
      });

      await user.save();
      console.log("User is created: ", user);
    }

    if (eventType === "user.deleted") {
      await User.findOneAndDelete({ clerkId: id });
      console.log("User is deleted: ", id);
    }

    if (eventType === "user.updated") {
      const user = await User.findOne({ clerkId: id });
      if (user) {
        user.email = email_addresses[0].email_address;
        user.username =
          first_name + " " + last_name || email_addresses[0].email_address;
        await user.save();
        console.log("User is updated: ", user);
      }
    }

    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
