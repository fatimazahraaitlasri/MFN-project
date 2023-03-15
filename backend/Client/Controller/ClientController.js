const asyncHandler = require("express-async-handler");
const Client = require("../Model/ClientSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

const registerClient = asyncHandler(async (req, res) => {
  const { email, password, latitude, langitude, phone, ice } = req.body;
  if (!email || !password || !latitude || !langitude || !phone || !ice) {
    res.status(400).send("please add all fields");
  }
  const ClientExists = await Client.findOne({ email });
  if (ClientExists) {
    return res.status(409).send("Email Already Exist. Please Login");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const client = await Client.create({
    ice,
    email,
    password: hashedPassword,
    latitude,
    langitude,
    phone,
  });

  if (client) {
    res.status(200).json({
      _id: client.id,
      token: generateToken(client.id),
      message: "Account created succefully",
      success: "TRUE",
    });
  } else {
    res.status(401).json({
      message: "Account not created",
      success: "FALSE",
    });
    throw new Error("Invalid client data");
  }
});

const loginCLient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const client = await Client.findOne({ email });
  console.log(client);
  if (client && (await bcrypt.compare(password, client.password))) {
    res.json({
      _id: client.id,
      token: generateToken(client.id),
      message: "Client loged succe",
      success: "TRUE",
    });
  } else {
    res.status(400).json({
      message: "invalid client Data",
      success: "FALSE",
    });
  }
});

module.exports = {
  registerClient,
  loginCLient,
};
