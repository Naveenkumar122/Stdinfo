const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role:{type:String,default:'user'},
    createdDate: { type: Date, default: Date.now }
},{ collection : 'users' });


const schema2 = new Schema({
  statename:{type:String,required:true},
  createdDate: { type: Date, default: Date.now }
},{collection:'state'});


const schema4 = new Schema({
  countryname:{type:String,required:true},
  createdDate:{type:Date,default:Date.now}
},{collection:'country'});


const schema5 = new Schema({
  departmentname:{type:String,required:true},
  createdDate:{type:String,default:Date.now}
},{collection:'department'});



const schema3 = new Schema({
  firstname:{type:String,required:true},
  lastname:{type:String,required:true},
  rollno:{type:String,required:true},
  dob:{type:Date,required:true},
  state:{type:String,required:true},
  country:{type:String,required:true},
  address:{type:String,required:true},
  postcode:{type:Number,required:true},
  department:{type:String,required:false},
  year:{type:Number,required:true}
},{collection:'profiles'});


schema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', schema);
const State = mongoose.model('State',schema2);
const Department = mongoose.model('Department',schema5);
const Country = mongoose.model('Country',schema4);
const Profiles = mongoose.model('Profiles',schema3);


module.exports = {
  User,
  State,
  Profiles,
  Country,
  Department
}
