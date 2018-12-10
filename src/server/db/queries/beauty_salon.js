const knex = require('../connection');



//для отладки 
//.on('query', function(data) {
//  console.log('debug query:', data);
//})

//------------------SELECT *-----------------------

function getPosition() {
	return knex.select().from('position');
}

function getAllMasters() {
	return knex.select().from('master');
}

function getGroups() {
	return knex.select().from('group');
}

//+
function getServices() {
  return knex.select('service.id', 'service.service', 'service.id_group', 'group.group')
             .join('group', 'service.id_group', 'group.id')
             .from('service')
             .orderBy('id_group');
}

function getServiceGroup() {
  return knex.select('service.service', 'group.group', 'service.price')
             .join('group', 'service.id_group', 'group.id')
             .from('service');
}

//+
function getReviews() {
  return knex.select('profile.name', 'profile.photo', 'review.review')
             .join('profile', 'client.id_profile', 'profile.id')
             .join('review', 'client.id', 'review.id_client')
             .from('client');
}

function getUsers() {
	return knex.select(). from('user');

}

function getMasters(id_group){
  return knex.select('master.id', 'master.name', 'master.surname')
             .from('master')
             .join('position', 'master.id_position', 'position.id')
             .where({ 'position.id_group': parseInt(id_group) });
}

function getRecordsByClient(id_client){
  return knex.select('record.id', 'service.service', 'service.price', 'schedule.date', 'schedule.time')
             .from('record')
             .join('service', 'record.id_service', 'service.id')
             .join('schedule', 'record.id_schedule', 'schedule.id')
             .where({'record.id_client': parseInt(id_client)})
             .andWhere( 'schedule.date', '>',  knex.fn.now())
             .orderBy('schedule.date');
}

function getIdMaster(id_user){
  return knex.select('id')
               .from('master')
               .where({'id_user': parseInt(id_user)});
}

function getIdGroup(id_user){
  return knex.select('position.id_group')
               .from('position')
               .join('master', 'position.id', 'master.id_position')
               .where({'master.id_user': parseInt(id_user)});
}

function getRecordsByMaster(id_master){
  return knex.select('record.id', 'service.service', 'client.id_profile', 'schedule.date', 'schedule.time')
             .from('record')
             .join('service', 'record.id_service', 'service.id')
             .join('client', 'record.id_client', 'client.id')
             .join('schedule', 'record.id_schedule', 'schedule.id')
             .where({'schedule.id_master': parseInt(id_master)})
             .andWhere( 'schedule.date', '>',  knex.fn.now())
             .orderBy('schedule.date');
}

function getFullName(id){
  return knex.select('id', 'surname', 'name')
               .from('public.profile')
               .where({'id': parseInt(id)});
}

function getFullNameMaster(id){
  return knex.select('id', 'surname', 'name')
               .from('master')
               .where({'id': parseInt(id)});
}

function getRecords(){
  return knex.select('record.id', 'service.service', 'client.id_profile', 'schedule.id_master', 'schedule.date', 'schedule.time')
             .from('record')
             .join('service', 'record.id_service', 'service.id')
             .join('client', 'record.id_client', 'client.id')
             .join('schedule', 'record.id_schedule', 'schedule.id')
             .where( 'schedule.date', '>',  knex.fn.now())
             .orderBy('schedule.date');
}

function getServicesForMaster(id_group){
  return knex.select().from('service').where({ 'id_group': parseInt(id_group) });
}

//-------------------SELECT--------------------

//+
function getOneService(id) {
  return knex.select()
             .from('service')
             .where({ 'id': parseInt(id) });
}

function getServiceByGroup(id) {
  return knex.select('service', 'price')
             .from('service')
             .where({ 'id_group': parseInt(id) });
}

//+
function getIdClient(id) {
  return knex.select('id')
             .from('client')
             .where({ 'id_user': parseInt(id) });
}

//+
function getOneClient(id) {
  return knex.select('profile.name', 'profile.photo')
             .join('profile', 'client.id_profile', 'profile.id')
             .from('client')
             .where({ 'client.id': parseInt(id) });
}

//+
function checkLogin(login) {
  return knex.select()
             .from('public.user')
             .where({login: String(login)});
}

function getSchedule(schedule) {
  return knex.select()
             .from('schedule')
             .where({id_master: String(schedule.id_master), date: schedule.date});
}

function getServicePrice(id) {
  return knex.select('service', 'price')
             .from('service')
             .where({ id_group: parseInt(id) });
}



//-----------------INSERT----------------

function addService(service){
	return knex.insert(service).returning('*').into('service');
}

//+
function addReview(review){
	return knex.insert(review).returning('*').into('review');
}

//+
function addUser(user){
	return knex.insert(user).returning('id').into('public.user');
}

//+
function addProfile(profile){
	return knex.insert(profile).returning('id').into('profile');
}

//+
function addClient(client){
	return knex.insert(client).returning('*').into('client');
}

function addMaster(master){
	return knex.insert(master).returning('*').into('master');
}

function addSchedule(schedule){
	return knex.insert(schedule).returning('*').into('schedule');
}

function addRecord(record){
	return knex.insert(record).returning('*').into('record');
}

//----------------UPDATE------------------

function updateService(id, service){
  console.log(service);
	return knex.update(service).where({ id: parseInt(id) }).returning('id').into('service');
}

//----------------DELETE------------------

function deleteService(id){
	return knex.delete().where({id: parseInt(id)}).returning('*').into('service');
}

function deleteRecord(id){
  return knex.delete()
             .where({id: parseInt(id)})
             .returning('record.id_schedule')
             .into('record');
}


function deleteRecordOnSchedule(id){
  return knex.delete()
             .where({id: parseInt(id)})
             .returning('*')
             .into('schedule');
}


module.exports = {
  getPosition,
  getGroups,
  getServices,
  addService,
  getOneService,
  getServiceByGroup,
  updateService,
  deleteService,
  getServiceGroup,
  addReview,
  getReviews,
  getUsers,
  getIdClient,
  getOneClient,
  checkLogin,
  addUser,
  addProfile,
  addClient,
  getMasters,
  addMaster,
  getAllMasters,
  addSchedule,
  getSchedule,
  addRecord,
  getRecordsByClient,
  getServicePrice,
  deleteRecord,
  deleteRecordOnSchedule,
  getIdMaster,
  getRecordsByMaster,
  getFullName,
  getRecords,
  getFullNameMaster,
  getServicesForMaster,
  getIdGroup
};