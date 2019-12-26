var orm = require('../config/orm')
module.exports = {
    addChat:(IDNguoiGui, IDNguoiNhan, NoiDung, ThoiGianChat, IDHD)=>{
        return orm.selectAll(`call AddChat(${IDNguoiGui}, ${IDNguoiNhan}, '${NoiDung}', '${ThoiGianChat}', ${IDHD})`);
    },    
    getChatByIDContract:(IDContract)=>{
        return orm.selectAll(`call GetChatByIDContract(${IDContract})`);
    },
}