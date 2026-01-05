const jwt = require('jsonwebtoken');

exports.verifyToken =  async(req, res, next) => {
      const authorizationHeader = req.headers['Authorization'] || req.headers['authorization'];
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
           return res.status(401).json({ error: 'Token not found or malformed' });
      }
     
      let token = authorizationHeader.substring(7);
      
      if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }
      
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
         try{
         const decodedToken = jwt.verify(token, 'tansukh');
         if (decodedToken.schoolId) {
            req.school = decodedToken.schoolId;
         } else if (decodedToken.adminId) {
            req.admin = decodedToken.adminId;
         }
          next();
         } catch (err) {
           return res.status(401).json({ error: 'Invalid token' });
         }
    };