var orm = require('../config/orm')
module.exports = {
    addChat:(IDNguoiGui, IDNguoiNhan, NoiDung, ThoiGianChat)=>{
        return orm.selectAll(`call AddChat(${IDNguoiGui}, ${IDNguoiNhan}, '${NoiDung}', '${ThoiGianChat}')`);
    },    
    getChat:(IDNguoi1, IDNguoi2)=>{
        return orm.selectAll(`call getChat(${IDNguoi1}, ${IDNguoi2})`);
    },
}