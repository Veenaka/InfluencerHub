const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getNewUsrCount,
    delUser,
    registerAdmin,
    adminLogin,
    firstlogin,
    sendAdminInfo,
    editAccount,
    suspendAccount,
    restoreAccount,
    approveUser
  } = require("../controller/admin");
  
router.get('/', getAllUsers);
router.get('/newusrcount', getNewUsrCount)
router.delete('/delete/:id',delUser)
router.post('/', registerAdmin)
router.post('/login', adminLogin)
router.put('/firstlogin/:id', firstlogin)
router.get('/:id', sendAdminInfo)
router.put('/updateaccount/:id', editAccount)
router.put('/suspendaccount/:id', suspendAccount)
router.put('/restoreaccount/:id', restoreAccount)
router.put('/approveuser/:id', approveUser)



module.exports = router;