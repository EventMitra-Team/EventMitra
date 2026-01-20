// // import jwt from "jsonwebtoken";

// // const auth = (req, res, next) => {
// //   try {
// //     const authHeader = req.headers.authorization;
// //     const tokenFromQuery = req.query.token;

// //     let token;

// //     if (authHeader) {
// //       token = authHeader.split(" ")[1];
// //     } else if (tokenFromQuery) {
// //       token = tokenFromQuery;
// //     }

// //     if (!token) {
// //       return res.status(401).json({ message: "No Authorization token" });
// //     }

// //     const decoded = jwt.verify(token, process.env.SECRET_KEY);
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     console.error("AUTH ERROR:", error.message);
// //     return res.status(401).json({ message: "Invalid or expired token" });
// //   }
// // };

// // export default auth;

// import jwt from "jsonwebtoken";

// const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded; // { id, role }
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default auth;
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
