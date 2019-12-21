var orm = require('../config/orm')
module.exports = {    
    addContract: (TenHopDong, IDNguoiDay, IDNguoiHoc, ThoiGianKy) => {
        return orm.selectAll(`call AddContract('${TenHopDong}', ${IDNguoiDay}, ${IDNguoiHoc}, '${ThoiGianKy}')`);
    }, 
    updateStatusContract: (IDContract, StatusNew) => {
        return orm.selectAll(`call UpdateStatusContract(${IDContract}, '${StatusNew}')`);
    }, 
    add_DieuKhoanHopDong: (IDHD, NoiDung, BenThucHien) => {
        return orm.selectAll(`call Add_DieuKhoanHopDong(${IDHD}, '${NoiDung}', '${BenThucHien}')`);
    }, 
    getAllContractByTeacherID: (TeacherID) => {
        return orm.selectAll(`call GetAllContractByTeacherID(${TeacherID})`);
    },
    getAllContractByStudentID: (StudentID) => {
        return orm.selectAll(`call GetAllContractByStudentID(${StudentID})`);
    },
    getContractByID: (ID) => {
        return orm.selectAll(`call GetContractByID(${ID})`);
    },
    get_DieuKhoanHopDong_ByIDContract: (ContractID) => {
        return orm.selectAll(`call Get_DieuKhoanHopDong_ByIDContract(${ContractID})`);
    },  
}