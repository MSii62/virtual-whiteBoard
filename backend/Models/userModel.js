const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: "Please enter a valid email"
            }
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "users"
    }
);


// REGISTER
userSchema.statics.register = async function (name, email, password) {
    try {

        // Validate email
        if (!validator.isEmail(email)) {
            throw new Error("Please enter a valid email");
        }

        // Validate password strength BEFORE hashing
        if (
            !validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
        ) {
            throw new Error(
                "Password must be at least 8 characters and contain uppercase, lowercase, number and symbol"
            );
        }

        // Check if user already exists
        const existingUser = await this.findOne({ email });

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new this({
            name,
            email,
            password: hashedPassword
        });

        // Save to database
        const newUser = await user.save();

        return newUser;

    } catch (error) {
        throw new Error("Error registering: " + error.message);
    }
};


userSchema.statics.getUsers=async function(email){
    try{
        const user=await this.find({email});
        return user;

    }
    catch{


    }
}

// LOGIN
userSchema.statics.login = async function (email, password) {
    try {

        // Find user using email only
        const user = await this.findOne({ email });

        if (!user) {
            throw new Error("Invalid login credentials");
        }

        // Compare entered password with stored bcrypt hash
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            throw new Error("Invalid login credentials");
        }

        return user;

    } catch (error) {
        throw new Error("Error logging in: " + error.message);
    }
};

const userModel =
    mongoose.models.users || mongoose.model("users", userSchema);

module.exports = userModel;