
exports.up = function(knex) {
 return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('username').unique();
    table.string('password');
  }) 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
