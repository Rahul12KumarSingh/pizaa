const crypto = require("crypto");

const buildReadableId = (prefix = "ENT") => {
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

module.exports = { buildReadableId };
