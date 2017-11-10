var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	url: { type: String },
	title: { type: String, required: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	categories: { type: Types.Relationship, ref: 'PostCategory' },
	rate: { type: Number },
	tags: { type: String },
	description: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	backgroundImage: { type: Types.CloudinaryImage },
	mainImage: { type: Types.CloudinaryImage },
	backgroundImagePosition: { type: Types.Select, options: 'center, bottom, top' },
	author: { type: Types.Relationship, ref: 'User', index: true, many: true },
	meta: {
		title: { type: String },
		description: { type: String },
		keywords: { type: String }
	}
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
