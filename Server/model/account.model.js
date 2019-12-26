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
    getAllteacher : () => {
        return orm.selectAll(`call GetAllTeacher()`);
    },
    getAllAdmin : () => {
        return orm.selectAll(`call GetAllAdmin()`);
    },
    updateAvatar: (iduser,ava) => {
        return orm.selectAll(`call UpdateAvatar(${iduser},'${ava}')`)
    },
    updateInformation: (iduser,name,address) => {
        return orm.selectAll(`call UpdateInfoAccount(${iduser},'${name}','${address}')`)
    },
    updateTagname: (iduser,TagNameUpdate) =>{
        return orm.selectAll(`call UpdateTagName(${iduser},'${TagNameUpdate}')`)
    },
    updateIntroduce: (iduser,content) => {
        return orm.selectAll(`call Update_baigioithieu_Account(${iduser},'${content}')`)
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
    get_ChuyenNganh_ByID: (ID) => {
        return orm.selectAll(`call Get_ChuyenNganh_ByID(${ID})`);
    },
    create_transaction : (IDsend,IDRecive,hours,descrip,time) => {
        return orm.selectAll(`call AddTransaction(${IDsend}, ${IDRecive}, ${hours}, '${descrip}', '${time}')`)
    },
    GetIncomeByTeacher : (IDUser) => {
        return orm.selectAll(`call GetIncomeById(${IDUser})`)
    },
    GetTopInComebyDay : (date) =>{
        return orm.selectAll(`call GetTopIncomeByDay(${date})`)
    },
    GetTopInComebyWeek : (week,year) => {
        return orm.selectAll(`call GetTopIncomeByWeek(${week}, ${year})`)
    },
    GetTopInComebyMonth : (month,year) => {
        return orm.selectAll(`call GetTopIncomeByMonth(${month}, ${year})`)
    },
    GetTopInComebyQuarter : (qq,year) => {
        return orm.selectAll(`call GetTopIncomeByQuarter(${qq}, ${year})`)
    },
    GetTopInComebyAll : () => {
        return orm.selectAll(`call GetTopIncomeByAll()`)
    },
    RechargeMoney : (IDuser) =>{
        return orm.selectAll(`call PayIn(${IDuser})`)
    },
    GetIncomeStudent : (Iduser) => {
        return orm.selectAll(`call GetIncomeStudent(${Iduser})`)
    },
    filterTeacher:(DiaDiem, TienDay, TenTag)=>{
        return orm.selectAll(`call FilterTeacher('${DiaDiem}',${TienDay},'${TenTag}')`);
    },
    getAllTeacher2:(Offset, Limit)=>{
        return orm.selectAll(`call GetAllTeacher2(${Offset}, ${Limit})`);
    },
    getAllAccount2:(Offset, Limit)=>{
        return orm.selectAll(`call GetAllAccount2(${Offset}, ${Limit})`);
    },
}

