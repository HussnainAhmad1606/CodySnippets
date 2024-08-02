import { verifyToken, signToken } from '@/utils/jwt';

const SECRET_KEY = process.env.JWT_TOKEN;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_TOKEN;

const refreshHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ type: "error" , message: 'No refresh token provided' });
  }

  try {
    const decoded = verifyToken(refreshToken, REFRESH_SECRET_KEY);
    const newToken = signToken({ id: decoded.id }, SECRET_KEY, '1h');

    res.status(200).json({ type: "success", message: "Token Refreshed", token: newToken });
  } catch (error) {
    return res.status(401).json({ type: "error", message: 'Invalid refresh token' });
  }
};

export default refreshHandler;