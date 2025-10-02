import User from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    // check if user with given id exists
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      // signup
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      return res.status(201).send("User created successfully");
    }
  } catch (error) {
    console.error("Error in auth callback", error);
    return res.status(500).send("Internal Server Error", error);
  }
};
