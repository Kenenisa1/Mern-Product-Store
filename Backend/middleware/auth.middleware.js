
export const protect = (req, res, next) => {
    const AUTH_SECRET = process.env.AUTH_SECRET;
    console.log("Server's Loaded AUTH_SECRET:", AUTH_SECRET);
    const authHeader = req.headers.authorization;

    if( !authHeader) 
    {
        return res.status(401).json({ 
            success: false,
            message: "Access denied. No authorization header provided."
        })
    }

    const parts = authHeader.split(' ');

    if(parts.length !==2 || parts[0].toLowerCase() !== 'bearer')
    {
        return res.status(401).json({
            success: false,
            message: "Access denied. Invalid authorization header format."
        })
    }

    const token = parts[1];

    if( token !== AUTH_SECRET) {
        return res.status(403).json({
            success: false,
            message: "forbidden. Invalid authorization token."
        })
    }

    next();
}