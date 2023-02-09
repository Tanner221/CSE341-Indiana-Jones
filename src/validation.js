const { check } = require('express-validator');
 
exports.AddArtifactValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('dateAquired', 'The Date is requried').not().isEmpty(),
    check('dateAquired', 'The Date format is not correct').isISO8601('yyyy-mm-dd'),
    check('isMagic', 'Please include if the artifact is magic (something that can not be explained').not().isEmpty(),
    check('value', 'The approxomate value of the object is required').not().isEmpty()
]
 
exports.loginValidation = [
     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
 
]