import User from "../models/User.js";

export async function handleClerkWebhook(req, res) {
  try {
    const { type, data } = req.body;

    console.log("🔔 Webhook received:", type);

    if (type === "user.created" || type === "user.updated") {
      const { id, first_name, last_name, email_addresses, image_url } = data;
      
      const email = email_addresses[0]?.email_address;
      const name = `${first_name || ''} ${last_name || ''}`.trim();

      // Create or update user in MongoDB
      const user = await User.findOneAndUpdate(
        { clerkId: id },
        {
          clerkId: id,
          email,
          name: name || email, // Use email if name is empty
          profileImage: image_url
        },
        { upsert: true, new: true }
      );
      
      console.log(`✅ User ${type === 'user.created' ? 'created' : 'updated'}:`, user.email);
    }

    else if (type === "user.deleted") {
      const { id } = data;
      await User.findOneAndDelete({ clerkId: id });
      console.log("🗑️ User deleted:", id);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}