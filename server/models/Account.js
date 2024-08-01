const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const accountSchema = new Schema({

    email: {
        type: String,
        unique: false,
        match: [/.+@.+\..+/, "Must match an email address!"],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        re: "User",
    },
});

accountSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
})
//method to compare and validate password for logging in
accountSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Account = model("Account", accountSchema)

module.exports = Account