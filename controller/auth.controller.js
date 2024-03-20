const jwt = require("jsonwebtoken");
const User = require("../modal/user.modal");

/*============== Verify jwt token ==============*/
exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, "Thisiscompaniesemployeedata");

    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).send({ error: "Please Authenticate." });
  }
};

/*============== signUp ==============*/
exports.signUpUser = async (req, res) => {
  const { name, date, email, password } = req.body;
  try {
    if (password.length < 8) {
      throw new Error("Password must be greater then 8 characters!");
    }

    const newUser = await User.create({
      name,
      date,
      email,
      password,
    });

    await newUser.save();
    const authToken = await newUser.generateAuthToken();

    res.status(201).json({
      message: "User added successfully",
      authToken,
      newUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "Fail to signup",
      error: err.message,
    });
  }
};

/*============== Employee login ==============*/
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.status(200).json({
      message: "Login successfull",
      token,
      user,
    });
  } catch (err) {
    res.status(404).json({
      message: "Fail to login",
      error: err.message,
    });
  }
};
