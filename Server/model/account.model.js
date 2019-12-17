var orm = require('../config/orm')
module.exports = {    
    addStudent: (Username, Password, HoTen, Email, NgaySinh, GioiTinh, DiaChi, ThanhPho, SDT, ChuoiXacThuc) => {
        return orm.selectAll(`call AddStudent('${Username}','${Password}','${HoTen}','${Email}','${NgaySinh}','${GioiTinh}','${DiaChi}','${ThanhPho}','${SDT}','${ChuoiXacThuc}')`);
    },    
    addTeacher: (Username, Password, HoTen, Email, NgaySinh, GioiTinh, DiaChi,ThanhPho, SDT, BaiGioiThieu, MonHoc, ChuyenNganh, TienDay, ChuoiXacThuc) => {
        return orm.selectAll(`call AddTeacher('${Username}','${Password}','${HoTen}','${Email}','${NgaySinh}','${GioiTinh}','${DiaChi}','${ThanhPho}','${SDT}','${BaiGioiThieu}','${MonHoc}',${ChuyenNganh},${TienDay},'${ChuoiXacThuc}')`);
    },
    addAdmin: (Username, Password, HoTen, Email, NgaySinh, GioiTinh, DiaChi, ThanhPho, SDT) => {
        return orm.selectAll(`call AddAdmin('${Username}','${Password}','${HoTen}','${Email}','${NgaySinh}','${GioiTinh}','${DiaChi}','${ThanhPho}','${SDT}')`);
    }, 
    getAccountByUsername: (Username) => {
        return orm.selectAll(`call GetAccountByUsername('${Username}')`);
    },
    getAccountByEmail: (Email) => {
        return orm.selectAll(`call GetAccountByEmail('${Email}')`);
    },
    getAccountByPhone: (Phone) => {
        return orm.selectAll(`call GetAccountByPhone('${Phone}')`);
    },
    getAccountDetails:(ID)=>{
        return orm.selectAll(`call GetAccountDetails(${ID})`);
    },
    getAccountByID:(ID)=>{
        return orm.selectAll(`call GetAccountByID(${ID})`);
    },
    updatePasswordAccountByID:(ID, newPass)=>{
        return orm.selectAll(`call UpdatePasswordAccountByID(${ID},'${newPass}')`);
    },
    getAccountVerify: (verify) => {
        return orm.selectAll(`call GetAccountVerify('${verify}')`);
    },
    getAllChuyenNganh: () => {
        return orm.selectAll(`call GetAll_ChuyenNganh()`);
    },
    updateAccountVerify: (ID) => {
        return orm.selectAll(`call UpdateAccountVerify(${ID})`);
    },
    getAllAccount: () => {
        return orm.selectAll(`call GetAllAccount()`);
    },
    resetPassword:(verify, newPass)=>{
        return orm.selectAll(`call ResetPassword('${verify}','${newPass}')`);
    },
    changeStatusAccount:(ID, newStatus)=>{
        return orm.selectAll(`call ChangeStatusAccount(${ID},'${newStatus}')`);
    },
    getAllContract: () => {
        return orm.selectAll(`call GetAllContract()`);
    },
}