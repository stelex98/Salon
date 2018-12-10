exports.seed = function(knex, Promise) {
  return knex('user').del()
    .then(() => knex('profile').del())
    .then(() => knex('client').del())
    .then(() => knex('group').del())
    .then(() => knex('position').del())
    .then(() => knex('service').del())
    .then(() => knex('master').del())
    .then(() => knex('schedule').del())
    .then(() => knex('review').del())
    .then(() => knex('record').del())

    .then(() => {
      return Promise.all(
        knex('group').insert([
            {
              group: 'СПА-процедуры'
            },
            {
              group: 'Массаж'
            },
            {
              group: 'Косметология'
            },
            {
              group: 'Макияж'
            },
            {
              group: 'Брови и ресницы'
            },
            {
              group: 'Нейл-дизайн'
            },
            {
              group: 'Парикмахерские услуги'
            }
          ])
        .then(() => {
          return knex('position').insert([
            {
              position: 'Специалист по СПА-процедурам',
              id_group: 1
            },
            {
              position: 'Массажист',
              id_group: 2
            },
            {
              position: 'Косметолог',
              id_group: 3
            },
            {
              position: 'Визажист',
              id_group: 4
            },
            {
              position: 'Бровист',
              id_group: 5
            },
            {
              position: 'Маникюрщица',
              id_group: 6
            },
            {
              position: 'Парикмахер-стилист',
              id_group: 7
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      )
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
