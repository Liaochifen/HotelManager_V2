// const path = require('path');
const express = require('express');
const router = express.Router();
const accountData = require("../models/accountSchema");
const stat = require('../models/statSchema')
const historyData = require('../models/historyDataSchema')
var q = '';

// router.get('/', (req, res) => {
//     // res.send('Hello World!');
//     console.log(path.join(__dirname, '../../client/public'));
//     res.sendFile(path.join(__dirname, '../../client/public/index.html'));
// });


router.get("/account", (req, res) => {
    accountData.find({}).sort({ update_at: -1 })
        .then(accounts => {
            res.json(accounts);
        }).catch(err => {
            res.json(err);
        });
});

//透過_id查詢
router.get("/account/:id", (req, res) => {
    accountData.findById(req.params.id)
        .then(accounts => {
            res.json(accounts);
        })
        .catch(err => {
            res.json(err);
        });
});

//利用_ID刪除
router.delete("/account/:id", (req, res) => {
    accountData.findOneAndRemove({
        _id: req.params.id
        //mongodb.ObjectID():req.params.id     
    })
        .then(accounts => res.send(`${accounts.id}删除成功`))
        .catch(err => res.json(err));
});

router.post("/account", (req, res) => {
    console.log("新增了一位使用者")
    console.log(req.body);
    accountData.create(req.body, (err, accounts) => {
        if (err) {
            res.json(err);
        } else {
            res.json(accounts);
        }
    });
});

//更新
router.put("/account/:id", (req, res) => {
    accountData.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                department: req.body.department,
                employeeNumber: req.body.employeeNumber,
                employeeLimit: req.body.employeeLimit,
                email: req.body.email,
                userName: req.body.userName,
                password: req.body.password,
                lastLoginDate: req.body.lastLoginDate,
                lastLoginTime: req.body.lastLoginTime,
                firstLogin: req.body.firstLogin,
                favorite: req.body.favorite,
                picture:req.body.picture
            }
        },
        {
            new: true
        }
    )
        .then(accounts => res.json(accounts))
        .catch(err => res.json(err));
});

//comment
router.get('/statistic', (req, res) => {
    // {companyID: req.params.companyID}
    stat.find()
        .sort({ update_at: -1 })
        .then(statistic => {
            res.json(statistic)
        }).catch(err => {
            console.log(2)
            res.json(err)
        })
});

router.get('/statistic/:time', (req, res) => {
    // {companyID: req.params.companyID}
    statisticRank.find({ time: req.params.time })
        .sort({ update_at: -1 })
        .then(statistic => {
            res.json(statistic)
        }).catch(err => {
            console.log(2)
            res.json(err)
        })
});

router.get('/comment/:collection', (req, res) => {
    console.log(req.body)
    q = require('../models/' + req.params.collection + 'Schema')
    q.find({})
        .limit(100)
        .sort({ update_at: -1 })
        .then(commentDatas => {
            res.json(commentDatas)
        }).catch(err => {
            console.log(2)
            res.json(err)
        })
});

router.put('/comment/:collection/:_id', (req, res) => {
    q = require('../models/' + req.params.collection + 'Schema')
    q.findOneAndUpdate(
        { _id: req.params._id },
        {
            $set: {
                labels: {
                    pos_neg: req.body.labels.pos_neg,
                    food_drink: req.body.labels.food_drink,
                    transportation: req.body.labels.transportation,
                    service: req.body.labels.service,
                    room: req.body.labels.room,
                    amenities: req.body.labels.amenities,
                    price: req.body.labels.price,
                    view: req.body.labels.view,
                    appearance: req.body.labels.appearance,
                    condition: req.body.labels.condition,
                    reply: req.body.labels.reply
                }
            }
        },
        {
            new: true
        }
    ).then(commentData => {
        res.json(commentData)
    }).catch(err => {
        res.json(err)
    })
});

router.get('/commentDetails/:collection/:_id', (req, res) => {
    q = require('../models/' + req.params.collection + 'Schema')
    q.findOne({
        _id: req.params._id
    })
        .then(commentDatas => {
            res.json(commentDatas)
        }).catch(err => {
            console.log(err)
            res.json(err)
        })
});

router.get('/competition/:collection', (req, res) => {
    stat.findOne({})
        .sort({ update_at: -1 })
        .then(companies => {
            res.json(companies)
        }).catch(err => {
            console.log(2)
            res.json(err)
        })
});
router.get("/history/:company",(req,res) =>{
  historyData.findOne({name: req.params.company}).sort({update_at: -1}).then(accounts =>{
      res.json(accounts);
  }).catch(err =>{
      res.json(err);
  });
}); 
//add new record
router.put("/history/:company/:record",(req,res) =>{

  if(req.params.record==='condition'){
    historyData.findOneAndUpdate(
      { name: req.params.company },
      { $push: { condition : req.body  } },
      {  new: true }
      ).then(records => res.json(records)).catch(err => res.json(err));
  }else if(req.params.record==='reply'){
    historyData.findOneAndUpdate(
      { name: req.params.company},
      { $push: { reply : req.body  } },
      {  new: true }
      ).then(records => res.json(records)).catch(err => res.json(err));
  }else if(req.params.record==='tags'){
    historyData.findOneAndUpdate(
      { name: req.params.company},
      { $push: { tags : req.body  } },
      {  new: true }
      ).then(records => res.json(records)).catch(err => res.json(err));
  }else if(req.params.record==='favorite'){
    historyData.findOneAndUpdate(
      { name: req.params.company },
      { $push: { favorite : req.body  } },
      {  new: true }
      ).then(records => res.json(records)).catch(err => res.json(err));
  }else if(req.params.record==='login'){
    historyData.findOneAndUpdate(
      { name: req.params.company },
      { $push: { login : req.body  } },
      {  new: true }
      ).then(records => res.json(records)).catch(err => res.json(err));
  }else if(req.params.record==='logout'){
    historyData.findOneAndUpdate(
      {name: req.params.company},
      { $push: { logout : req.body  } },
      {  new: true }
      ).then(records => res.json(records)).catch(err => res.json(err));
  }else if(req.params.record==='user'){
    historyData.findOneAndUpdate(
      { name: req.params.company },
      { $push: { user : req.body  } },
      {  new: true }
      ).then(records => res.json(records)).catch(err => res.json(err));
  }else if(req.params.record==='userDetailModify'){
    historyData.findOneAndUpdate(
      {name: req.params.company },
      { $push: { userDetailModify : req.body  } },
      {  new: true }
      ).then(records => res.json(records)).catch(err => res.json(err));
  }else if(req.params.record==='UserListModify'){
    historyData.findOneAndUpdate(
      {name: req.params.company},
      { $push: { UserListModify : req.body  } },
      {  new: true }
      ).then(records => res.json(records)).catch(err => res.json(err));
  }
  
}); 

module.exports = router; 
