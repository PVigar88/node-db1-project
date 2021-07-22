const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof req.body.name !== "string") {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (
    req.body.name.trim().length < 3 ||
    req.body.name.trim().length > 100
  ) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof req.body.budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
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
    .count("AccountName")
    .where("AccountName", req.body.name.trim());

  if (accCount > 1) {
    res.status(400).json({ message: "that name is taken" });
  } else {
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;

  const idExists = await db("accounts").where({ id }).first();

  if (!idExists) {
    res.status(404).json({ message: "account not found" });
  } else {
    next();
  }
};
