const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId(),
			default: () => new Types.ObjectID(),
		},
		reactionBody: {
			type: String,
			Required: true,
			maxlength: 280,
		},
		username: {
			tyepe: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			// Define a getter function to format the date in a specific way
			get: (createdAtVal) =>
				moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	},
);

const ThoughtSchema = new Schema ({
  thoughtText:{
    type: String,
    required: true,
    minLength:1,
    maxlength:280,
  },
  createdAt:{
    type: Date,
    default: Date.now,
    // Define a getter function to format the date in a specific way
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
  },
  username:{
    type: String,
    required: true,
  },
  reactions: [ReactionSchema]
},
{
  toJSON: {
    getters: true,
  },
  id: false,
},
)


// Define a virtual property 'reactionCount' for the Thought model
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create a mongoose model for the Thought schema and export it
const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;