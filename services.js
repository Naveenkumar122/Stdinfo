const config = require('config.json');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const db = require('database/db.js');
const User = db.User;
const states = db.State;
const profiles = db.Profiles;
const country = db.Country;
const department = db.Department;
var token = "";


module.exports = {
  loginPage,
  authenticate,
  logout,
  create,
  main,
  registerPage,
  state,
  add_state,
  edit_state,
  update_state,
  delete_state,
  count,
  add_country,
  edit_country,
  update_country,
  delete_country,
  depart,
  add_department,
  edit_department,
  update_department,
  delete_department,
  student_master,
  add_profiles,
  edit_profile,
  update_profile,
  delete_profile
}


function loginPage(req,res) {
  res.render('pages/login',{msg:''});
}


function registerPage(req,res) {
  res.render('pages/register');
}

function main(req,res) {
  if(token){
    res.render('pages/main',{msg:""});
  }
  else{
    res.render("pages/login",{msg:"Login first"});
  }
}

async function authenticate(req,res) {
    const user = await User.findOne({ username:req.body.username});
    if (user && passwordHash.verify(req.body.password, user.password)) {
        token = jwt.sign({ role: user.role }, config.secret);
        res.render('pages/main',{msg:''})
    }
}


async function create(req,res) {
    if (await User.findOne({ username: req.body.username })) {
        throw 'Username "' + req.body.username + '" is already taken';
    }
    const user = new User(req.body);
    if (req.body.password) {
        user.password = passwordHash.generate(req.body.password);
    }
    await user.save(function (err,data) {
      if (err) throw err;
      res.render('pages/login',{msg:data.username});
    });
}


function logout(req,res) {
    token ="";
    res.redirect('/nk/login');
}


async function state(req,res) {
   const decoded = jwt.verify(token,config.secret);
   console.log(decoded.role);
   if (decoded.role === 'admin'){
      states.find({},{_id:1,statename:1},function (err,data) {
        res.render('pages/state',{state:data});
      });
    }else{
      res.render('pages/main',{msg:"un Authorized"});
    }
  }


function edit_state(req,res) {
  states.findById(req.params.id,function (err,state) {
    if(err){
            console.log(err);}else {
            res.render('pages/state_edit', {state_id: state._id,put: true});
        }
  });
}


async function update_state(req,res) {
  const state = await states.findById(req.params.id);
  if (req.body.statename){
    state.statename = req.body.statename;
  }
  await state.save();
  res.redirect('/nk/state_master');
};


async function delete_state(req,res) {
  await states.findOneAndDelete({_id:req.params.id});
  res.redirect('/nk/state_master');
}


async function add_state(req,res) {
  if (await states.findOne({ statename: req.body.statename })) {
        res.redirect('/nk/state_master');
    }
    const state = new states(req.body);
    await state.save();
    res.redirect('/nk/state_master');
}


async function student_master(req,res) {
  const decoded = jwt.verify(token,config.secret);
  if (decoded.role === 'admin'){
  const profile = await profiles.find({},{_id:1,firstname:1,lastname:1,dob:1});
  const state = await states.find({},{_id:1,statename:1});
  const count = await country.find({},{_id:1,countryname:1});
  const dept = await department.find({},{_id:1,departmentname:1});
   res.render('pages/student_master',{profil:profile,stat:state,countries:count,departments:dept});
  }else{
   res.render('pages/main',{msg:"un Authorized"});
  }
}


async function count(req,res) {
   const decoded = jwt.verify(token,config.secret);
   if (decoded.role === 'admin'){
      country.find({},{_id:1,countryname:1},function (err,data) {
        res.render('pages/country',{country:data});
      });
    }else{
      res.render('pages/main',{msg:"un Authorized"});
    }
  }


function edit_country(req,res) {
    country.findById(req.params.id,function (err,state) {
      if(err){
              console.log(err);}else {
              res.render('pages/country_edit', {country_id: state._id,put: true});
          }
    });
  }


async function delete_country(req,res) {
    await country.findOneAndDelete({_id:req.params.id});
    res.redirect('/nk/country_master');
}


async function update_country(req,res) {
    const count = await country.findById(req.params.id);
    if (req.body.countryname){
      count.countryname = req.body.countryname;
    }
    await count.save();
    res.redirect('/nk/country_master');
  };


async function add_country(req,res) {
    if (await country.findOne({ countryname: req.body.countryname })) {
          res.redirect('/nk/country_master');
      }
      const coun = new country(req.body);
      await coun.save();
      res.redirect('/nk/country_master');
  }


async function depart(req,res) {
     const decoded = jwt.verify(token,config.secret);
     if (decoded.role === 'admin'){
        department.find({},{_id:1,departmentname:1},function (err,data) {
          res.render('pages/department',{dept:data});
        });
      }else{
        res.render('pages/main',{msg:"un Authorized"});
     }
}


function edit_department(req,res) {
  department.findById(req.params.id,function (err,state) {
    if(err){
            console.log(err);}else {
            res.render('pages/department_edit', {department_id: state._id,put: true});
        }
  });
}


async function update_department(req,res) {
  const depart = await department.findById(req.params.id);
  if (req.body.departmentname){
    depart.departmentname = req.body.departmentname;
  }
  await depart.save();
  res.redirect('/nk/department_master');
};


async function delete_department(req,res) {
  await department.findOneAndDelete({_id:req.params.id});
  res.redirect('/nk/department_master');
}


async function add_department(req,res) {
  if (await department.findOne({ departmentname: req.body.departmentname })) {
        res.redirect('/nk/department_master');
    }
    const depar = new department(req.body);
    await depar.save();
    res.redirect('/nk/department_master');
}


async function add_profiles(req,res) {
  if (await profiles.findOne({ rollno: req.body.rollno })) {
      res.render('pages/main',{msg:'Roll no "' + req.body.rollno + '" is already taken'}) ;
  }
  console.log(req.body);
  const profile = new profiles(req.body);
  console.log(profile);
  await profile.save();
  res.redirect('/nk/student_master');
}


async function edit_profile(req,res) {
  const profile = await profiles.findById(req.params.id);
  const state =await states.find({},{statename:1});
  const count = await country.find({},{_id:1,countryname:1});
  const dept = await department.find({},{_id:1,departmentname:1});
  res.render('pages/student_master_edit',{stat:state,id:profile._id,countries:count,departments:dept});
}

async function update_profile(req,res) {
  const profile =await profiles.findById(req.params.id);
  profile.firstname = req.body.firstname;
  profile.lastname = req.body.lastname;
  profile.rollno = req.body.rollno;
  profile.dob = req.body.dob;
  profile.state = req.body.state;
  profile.country = req.body.country;
  profile.address = req.body.address;
  profile.postcode = req.body.postcode;
  profile.department = req.body.department;
  profile.year = req.body.year;
  await profile.save();
  res.redirect('/nk/student_master');
};


async function delete_profile(req,res) {
  await profiles.findOneAndDelete({_id:req.params.id});
  res.redirect('/nk/student_master');
}
