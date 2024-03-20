const User = require("../modal/user.modal");

/*============== get users ==============*/
exports.getUser = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      throw Error("User not Found!");
    }

    res.status(200).json({
      message: "successfull",
      user,
    });
  } catch (err) {
    res.status(404).json({
      message: "User not found!",
      error: err.message,
    });
  }
};
