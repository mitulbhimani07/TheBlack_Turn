const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // Debug log to check received Authorization header
    const authHeader = req.headers.authorization;
    console.log("JWT_SECRET being used:", process.env.JWT_SECRET);
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: "Fail", message: "Access denied. No token provided." });
    }

    // Corrected token extraction (removes the extra "Bearer ")
    const token = authHeader.split(" ")[1];

    // Debug log to check extracted token
    console.log("Extracted Token:", token);

    if (!token || token === "Bearer") {  // Prevents extracting "Bearer" as token
        return res.status(401).json({ message: "Unauthorized: Token missing or incorrect format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
       
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};


module.exports=authenticateToken;