var orm = require('../config/orm');
module.exports = {
    LockAccount: (idUser) => {
        return orm.selectAll(`call Lockaccount(${idUser})`);
    },
    UnLockAccount: (idUser) =>{
        return orm.selectAll(`call UnLockaccount(${idUser})`)
    }
}