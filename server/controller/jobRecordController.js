const db = require('../models');
const JobRecord = db.JobRecord;
const User = db.User;
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let jobRecordController = {
  getJobRecords: (req,res)=>{
    let whereRules = [{ public_status: 1 }];

    if ( Number(req.params.userId) !== -1 && req.params.userId) {
      whereRules.push({ UserId: req.params.userId })
    };

    JobRecord.findAll({ 
      where:{
        [Op.or]: whereRules
      },
      order: [['UserId', 'ASC']],
      include: { model: User, attributes: { exclude:['password'] }},
      raw: true,
      nest: true
    }).then(records=>{
      return res.json({
        data: records
      });
    })
  },
  getOneJobRecord:(req, res) => {
    JobRecord.findByPk(req.params.recordId,{
      include: { model: User, attributes: { exclude: ['password'] } }
    }).then(record=>{
      if (record.UserId !== req.user.id){
        return res.json({
          status: "error",
          message: `${req.user.id}, You don't have permission'`,
        });
      } 
      return res.json({
        data:record
      })
    })
  }
};


module.exports = jobRecordController;