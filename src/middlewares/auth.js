import jwt from 'jsonwebtoken';

const authMiddleware = (handler) => {
  return async (req, res) => {
    const { authorization } = req.headers;

    console.log(authorization)

    if (!authorization) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN); // Use environment variable for secret
      req.user = decoded.user;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

export default authMiddleware;