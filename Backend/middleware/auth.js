import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const tokenFromQuery = req.query.token;

    let token;

    if (authHeader) {
      token = authHeader.split(" ")[1];
    } else if (tokenFromQuery) {
      token = tokenFromQuery;
    }

    if (!token) {
      return res.status(401).json({ message: "No Authorization token" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default auth;
