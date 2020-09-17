'use strict';

const mongoose = require('mongoose');

var AtterbergLimitsResult = new mongoose.Schema({

    uniqueResultId                              : String,
    testId                                      : String,
    liquid_limit_LL			                    : Number, // in percentage %
    plastic_limit_PL			                : Number, // in percentage %
    plasticity_index_IP			                : Number, // in percentage %
    //group_symbol			                    : String
    
});

module.exports = mongoose.model('AttbergLimitsResult', AtterbergLimitsResult);