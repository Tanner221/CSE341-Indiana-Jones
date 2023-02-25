const { check } = require('express-validator');
 
exports.AddArtifactValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('dateAquired', 'The Date is requried').not().isEmpty(),
    check('dateAquired', 'The Date format is not correct').isISO8601('yyyy-mm-dd'),
    check('isMagic', 'Please include if the artifact is magic (something that can not be explained').not().isEmpty(),
    check('value', 'The approxomate value of the object is required').not().isEmpty(),
    check('addedBy', 'Who is adding the item?').not().isEmpty()
]
 
exports.AddMuseumValidation = [
  check('name', 'Name is required',).not().isEmpty(),
  check('location', 'The museum location is requred').not().isEmpty(),
  check('artifact_count', 'The number of items in the museumn is requried.').not().isEmpty()
]