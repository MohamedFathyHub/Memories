import jwt from 'jsonwebtoken'

// Wants to like a post
// Click the Like button => auth middleware (next) => like controller

const auth = async (req, res, next) => {
    try {
        // If the Customer wants to Like/Delete a post we will be checking his Token
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;  /* Checking if the token is from our Custom auth not from Google auth */

        let decodedData;

        if( token && isCustomAuth ){
            // Getting the data of the person who Like/Delete posts and storing his ID
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }

        next();
    } catch (error) {
        console.log(error)
    }

}

export default  auth