var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	position: { type: String },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	bio: { type: String },
	photo: { type: Types.CloudinaryImage },
	hoverPhoto: { type: Types.CloudinaryImage },
	facebook: { type: String },
	linkedin: { type: String },
	git: { type: String }
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
User.register();
