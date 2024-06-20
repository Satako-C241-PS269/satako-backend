const jwt = require('jsonwebtoken')
require('dotenv').config();

const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.name },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
};

const getUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      throw new Error('Authorization header missing');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
      throw new Error('Token missing');
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return decodedToken.userId;
};

const verifyAccessToken = async (token) => {
  try {
    const secret = process.env.SECRET_KEY;

    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      throw Error("Proses Autentikasi Gagal");
    }
    return { success: true, token: decoded };
  } catch (error) {
    return {
      success: false,
      message: "Server Error",
      error_code: 500,
    };
  }
};

module.exports = {
  generateAccessToken,
  getUserId,
  verifyAccessToken,
}