var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'user';

	// Load the users by sortOrder
	view.query('users', keystone.list('User').model.find().sort('sortOrder'));

	// Render the view
	view.render('user');

};
