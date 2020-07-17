const db = require('../models');
const JobRecord = db.JobRecord;
const User = db.User;
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let jobRecordController = {
  getJobRecords: (req,res)=>{
    let whereRules = [{ public_status: 1 }];
    // 根據登入的ID，決定要不要推 {UserId: UserId} 到 whereRules
    JobRecord.findAll({ 
      where:{
        [Op.or]: whereRules
      },
      order: [['UserId', 'ASC']],
      include: { model: User, attributes: { exclude:['password'] }},
      raw: true,
      nest: true
    }).then(records=>{
      return res.json({records})
    })
  }
};


module.exports = jobRecordController;