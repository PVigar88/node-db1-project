const db = require("../../data/db-config");
const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC

  const { name } = req.body;
  const { budget } = req.body;

  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof name != "string") {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget != "number") {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC

  const accCount = await db("accounts")
    .count("name")
    .where("name", req.body.name.trim());

  if (accCount > 1) {
    res.status(400).json({ message: "that name is taken" });
  } else {
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const idExists = await db("accounts").where("id", req.params.id).first();

  if (idExists) {
    next();
  } else {
    res.status(404).json({ message: "account not found" });
  }
};
