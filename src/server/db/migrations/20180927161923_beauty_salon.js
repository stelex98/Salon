exports.up = function(knex, Promise) {
	return Promise.all([
    knex.schema.createTable('user', function(table) {
      table.increments('id').primary();
      table.string('login');
      table.string('password');
      table.boolean('role');
      table.string('salt');
    }),

    knex.schema.createTable('profile', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('surname');
      table.date('date_birth');
      table.string('mail');
      table.string('phone');
      table.string('photo');
    }),

    knex.schema.createTable('client', function(table) {
      table.increments('id').primary();
      table.integer('id_profile');
      table.integer('id_user');
      table.foreign('id_profile').references('profile.id');
      table.foreign('id_user').references('user.id');
    }),

	knex.schema.createTable('group', function(table) {
      table.increments('id').primary();
      table.string('group');
    }),

    knex.schema.createTable('position', function(table) {
      table.increments('id').primary();
      table.string('position');
      table.integer('id_group');
      table.foreign('id_group').references('group.id');
    }),

    knex.schema.createTable('service', function(table) {
      table.increments('id').primary();
      table.string('service');
      table.integer('id_group');
      table.integer('price');
      table.string('picture');
      table.text('about_service');
      table.foreign('id_group').references('group.id');
    }),

    knex.schema.createTable('master', function(table) {
      table.increments('id').primary();
      table.integer('id_user');
      table.string('name');
      table.string('surname');
      table.integer('id_position');
      table.foreign('id_user').references('user.id');
      table.foreign('id_position').references('position.id');
    }),

    knex.schema.createTable('schedule', function(table) {
      table.increments('id').primary();
      table.integer('id_master');
      table.date('date');
      table.string('time');
      table.foreign('id_master').references('master.id');
    }),

    knex.schema.createTable('review', function(table) {
      table.increments('id').primary();
      table.integer('id_client');
      table.text('review');
      table.foreign('id_client').references('client.id');
    }),

    knex.schema.createTable('record', function(table) {
      table.increments('id').primary();
      table.integer('id_client');
      table.integer('id_service');
      table.integer('id_schedule');
      table.boolean('status');
      table.foreign('id_client').references('client.id');
      table.foreign('id_service').references('service.id');
      table.foreign('id_schedule').references('schedule.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('record'),
    knex.schema.dropTable('review'),
    knex.schema.dropTable('schedule'),
    knex.schema.dropTable('master'),
    knex.schema.dropTable('service'),
    knex.schema.dropTable('position'),
    knex.schema.dropTable('group'),
    knex.schema.dropTable('client'),
    knex.schema.dropTable('profile'),
    knex.schema.dropTable('user')
  ]);
};
