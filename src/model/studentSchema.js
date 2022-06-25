const validator = require('validator');
const mongooose = require('mongoose');

// schema creation
const studentSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 3,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email is already present'],
        validate(value) {
            if (validator.isEmail(value)) {
                throw new Errow('Invalid Email')
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        min: 10,
    },
    address: {
        type: String,
        required: true
    }
});

// collection creation 
const Student = new mongooose.model('Student', studentSchema);

module.exports = Student;