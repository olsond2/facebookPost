var mongoose = require('mongoose');
/*
var CommentSchema = new mongoose.Schema({
  title: String,
  upvotes: {type: Number, default: 0},
});
CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Comment', CommentSchema);
*/
var TalkSchema = new mongoose.Schema ({
	title: String,
	upvotes: {type: Number, default: 0},
	session: String,
	url: String,
	speaker: String,
});
TalkSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
};
mongoose.model('Talk', TalkSchema);
