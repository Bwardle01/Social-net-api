const { Schema, model } = require("mongoose");

const userSchema = Schema({
	username: {
		type: String,
		unique: true,
		Required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+\@.+\..+/],
	},
	thoughs: [
		{
			type: Schema.Types.ObjectId,
			ref: "thought",
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
},
{
  toJSON: {
      virtuals: true
  },
  id: false
});

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Initialize the User model using the UserSchema
const User = model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
