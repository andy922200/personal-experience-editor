const db = require('../models');
const JobRecord = db.JobRecord;
const User = db.User;
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const imgur = require("imgur-node-api");
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

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
  },

  postOneJobRecord: (req, res) => {
    const { files: files } = req;
    const { title, company_name, start_date, end_date, public_status, description, current_position } = req.body;

    if (req.user.id !== Number(req.params.userId)){
      return res.json({
        status: "error",
        message: `${req.user.id}, You don't have permission'`,
      });
    }

    if(!title || !company_name || !start_date || !end_date || !public_status || !description || !current_position){
      return res.json({
        status: "error",
        message: `Please check all columns are filled.`,
      });
    }

    if(files[0]){
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(files[0].path, (err, img) => {
        JobRecord.create({
          title: title,
          company_name: company_name,
          company_logo: files[0]
            ? img.data.link
            : "https://picsum.photos/200",
          description: description,
          start_date: start_date,
          end_date: end_date,
          current_position: current_position,
          public_status: public_status,
          UserId: req.user.id
        }).then(() => {
          return res.json({
            status: "success",
            message: "Create successfully!",
          });
        });
      });
    }else{
      JobRecord.create({
        title: title,
        company_name: company_name,
        company_logo: "https://picsum.photos/200",
        description: description,
        start_date: start_date,
        end_date: end_date,
        current_position: current_position,
        public_status: public_status,
        UserId: req.user.id
      })
      .then(() => {
        return res.json({
          status: "success",
          message: "Create successfully!",
        });
      });
    }
  },

  putOneJobRecord: (req, res) => {
    const { files: files } = req;
    const { title, company_name, start_date, end_date, public_status, description, current_position } = req.body;

    if (!title || !company_name || !start_date || !end_date || !public_status || !description || !current_position) {
      return res.json({
        status: "error",
        message: `Please check all columns are filled.`,
      });
    }
    
    JobRecord.findByPk(req.params.recordId).then(record=>{
      if (record.UserId !== req.user.id) {
        return res.json({
          status: "error",
          message: `${req.user.id}, You don't have permission'`,
        });
      } 

      if (files[0]){
        imgur.setClientID(IMGUR_CLIENT_ID);
        imgur.upload(files[0].path, (err, img) => {
          JobRecord
            .update({
              title: title,
              company_name:company_name,
              company_logo: files[0]
                ? img.data.link
                : "https://picsum.photos/200",
              description: description,
              start_date: start_date,
              end_date: end_date,
              current_position: current_position,
              public_status:public_status,
              UserId:req.user.id
            }, { where: { id: req.params.recordId } })
            .then(() => {
              return res.json({
                status: "success",
                message: "Update successfully!",
              });
            });
        });
      }else{
        JobRecord
          .update({
            title: title,
            company_name: company_name,
            company_logo: record.company_logo,
            description: description,
            start_date: start_date,
            end_date: end_date,
            current_position: current_position,
            public_status: public_status,
            UserId: req.user.id
          }, { where: { id: req.params.recordId}})
          .then(() => {
            return res.json({
              status: "success",
              message: "Update successfully!",
            });
          });
      }
    })
  },
  deleteOneJobRecord: (req, res) => {
    JobRecord.findByPk(req.params.recordId).then(record=>{
      if (record.UserId !== req.user.id) {
        return res.json({
          status: "error",
          message: `${req.user.id}, You don't have permission'`,
        });
      } 
      if (!record) res.status(401).json({ status: 'error', message: 'No record was found.' })
      record.destroy().then(record => {
        return res.json({
          status: 'success', message: `Delete successfully`
        })
      })
    })
  }
};


module.exports = jobRecordController;