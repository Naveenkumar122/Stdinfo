require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const service = require('services.js');



const app = express();
app.use(cors());
app.use(express.static(__dirname + '/views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//api routes
router.get('/login',service.loginPage);
router.get('/main',service.main);
router.post('/authenticate',service.authenticate);
router.get('/register',service.registerPage);
router.post('/register',service.create);
router.get('/logout',service.logout);

router.get('/state_master',service.state);
router.post('/add_state',service.add_state);
router.get('/state/edit/:id',service.edit_state);
router.post('/state/update/:id',service.update_state);
router.get('/state/delete/:id',service.delete_state);

router.get('/country_master',service.count);
router.post('/add_country',service.add_country);
router.get('/country/edit/:id',service.edit_country);
router.post('/country/update/:id',service.update_country);
router.get('/country/delete/:id',service.delete_country);

router.get('/department_master',service.depart);
router.post('/add_department',service.add_department);
router.get('/department/edit/:id',service.edit_department);
router.post('/department/update/:id',service.update_department);
router.get('/department/delete/:id',service.delete_department);

router.get('/student_master',service.student_master);
router.post('/add_profiles',service.add_profiles);
router.get('/profile/edit/:id',service.edit_profile);
router.post('/profile/update/:id',service.update_profile);
router.get('/profile/delete/:id',service.delete_profile);
app.use('/nk',router);


app.listen(80,()=> {
  console.log('server running on port 8080');
});
