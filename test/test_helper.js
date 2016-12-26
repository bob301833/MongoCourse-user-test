//import mongoose from 'mongoose';
const mongoose = require('mongoose');

mongoose.connect('mongodb://loscalhost/users_test');
mongoose.connection
    .once('open', () => console.log('Good to go'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });
