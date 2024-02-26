
const express = require('express');
const skillController=require('../controllers/skillController');
const router = express.Router();
console.log('Awwad');
router.get('/skill',skillController);
console.log('Awwad2');
