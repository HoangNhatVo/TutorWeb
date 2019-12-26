DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAccountByUsername(in us varchar(50))
BEGIN
	select * from account where username COLLATE utf8mb4_unicode_ci = us;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAccountByEmail(in e varchar(100))
BEGIN
	select * from account where email COLLATE utf8mb4_unicode_ci = e;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAccountByPhone(in phone varchar(15))
BEGIN
	select * from account where sdt COLLATE utf8mb4_unicode_ci = phone;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddStudent(in username varchar(50), in password varchar(100), in hoten varchar(100),
							in email varchar(100), in ngaysinh date, in gioitinh varchar(5), in diachi varchar(255),
                            in thanhpho varchar(100), in sdt varchar(15),in chuoixacthuc varchar(255))
BEGIN
	insert into account values (null, username,password, hoten, email, ngaysinh, gioitinh, 1, diachi,thanhpho, sdt, 'active', null, '','', 1, 0, false, chuoixacthuc);
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddTeacher(in username varchar(50), in password varchar(100), in hoten varchar(100),
							in email varchar(100), in ngaysinh date, in gioitinh varchar(5), in diachi varchar(255),
                            in thanhpho varchar(100), in sdt varchar(15), in baigioithieu text, in monhoc varchar(255), in chuyennganh int(11), in tienday int(11),in chuoixacthuc varchar(255))
BEGIN
	insert into account values (null, username,password, hoten, email, ngaysinh, gioitinh, 2, diachi, thanhpho, sdt, 'active', null, baigioithieu,monhoc, chuyennganh, tienday, false, chuoixacthuc);
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddAdmin(in username varchar(50), in password varchar(100), in hoten varchar(100),
							in email varchar(100), in ngaysinh date, in gioitinh varchar(5), in diachi varchar(255),
                            in thanhpho varchar(100), in sdt varchar(15))
BEGIN
	insert into account values (null, username,password, hoten, email, ngaysinh, gioitinh, 3, diachi,thanhpho, sdt, 'active', null, '','', 1, 0, true,'');
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE Get_ChuyenNganh_ByID(in i int(11))
BEGIN
	select * from chuyennganh where id=i;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAll_ChuyenNganh()
BEGIN
	select * from chuyennganh order by id asc;
END;$$
DELIMITER ;
call GetAll_ChuyenNganh();

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAccountVerify(in verify varchar(255))
BEGIN	
        select * from account where chuoixacthuc = verify;     
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE UpdateAccountVerify(in i int(11))
BEGIN	
        update account set xacthuc = true where id = i;     
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE Add_Loaigiaodich(in ten varchar(50))
BEGIN	
        insert into loaigiaodich values(null,ten);
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE UpdateInfoAccount(in i int(11), in ht varchar(100), in dc varchar(100) )
BEGIN
	update account set hoten = ht, diachi = dc where id = i;    
END;$$
DELIMITER ;

call UpdateInfoAccount(36, 'Nguyễn Nhật','Huế');

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE Update_baigioithieu_Account(in i int(11), in bgt text )
BEGIN
	update account set baigioithieu = bgt where id = i;    
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE UpdateAvatar(in i int(11), in avt varchar(255) )
BEGIN
	update account set avatar = avt where id = i;    
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAccountByID(in i int(11))
BEGIN
	select * from account where id = i and xacthuc = true;
END;$$
DELIMITER ;
call GetAccountByID(9);

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllAccount()
BEGIN
	select * from account where xacthuc = true;
END;$$
DELIMITER ;
call GetAllAccount();

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllAccount2(in _offset int(11),in _Limit int(11))
BEGIN
	select * from account where xacthuc = true limit _offset, _Limit;
END;$$
DELIMITER ;
call GetAllAccount2(4,5);


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllTeacher()
BEGIN
	select * from account where vaitro = 2  and xacthuc = true;
END;$$
DELIMITER ;
call GetAllTeacher();

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllTeacher2(in _offset int(11),in _Limit int(11))
BEGIN
	select * from account where vaitro = 2  and xacthuc = true limit _offset, _Limit;
END;$$
DELIMITER ;
call GetAllTeacher2();

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllAdmin()
BEGIN
	select * from account where vaitro = 3  and xacthuc = true;
END;$$
DELIMITER ;
call GetAllAdmin();

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddTag (in TagName varchar(50) )
BEGIN
	declare count1 int;
    declare TagNameNew varchar(50);
    if( substring(TagName,1,1)='#')
    then
		set TagNameNew = TagName;
	end if;
	if( substring(TagName,1,1)!='#')
	then
    set TagNameNew = (select concat('#',TagName));
    end if;
	set count1 =( select count(*) from tag where tentag = TagNameNew);
	if( count1=0 )
			then 			
			 insert into tag values( null,TagNameNew);
			 select id from tag where tentag = TagNameNew;
	end if;
	if( count1>0 )
	then 
    select id from tag where tentag = TagNameNew;
	end if;
END;$$
DELIMITER ;

call AddTag('abc');
select * from tag;

#----------------- add tag account
DELIMITER $$
USE `sql12314047`$$
create procedure AddTagAccount(in idtag int(11), in idaccount int(11))
begin
if exists( select * from tag_account where id_tag=idtag and id_account=idaccount)
then
select 0 as temp;
else
	insert into tag_account values (idtag,idaccount);
	select 1 as temp;
end if;
end;$$
DELIMITER ;
call AddTagAccount(2,33);

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetTagByID(in i int(11))
BEGIN
	select * from tag where id =i;
END;$$
DELIMITER ;
call GetTagByID(2);

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE DeleteTag(in i int(11))
BEGIN
	delete from tag_account where id_tag=i;
	delete from tag where id=i;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllTag()
BEGIN
	select * from tag order by id asc;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllTagByAccID(in accID int(11))
BEGIN
	select ta.id_tag as IDTag, ta.id_account as IDAccount, t.tentag as NameTag
    from tag_account ta, tag t
    where ta.id_account = accID and t.id = ta.id_tag
    order by ta.id_tag asc;
END;$$
DELIMITER ;
call GetAllTagByAccID(38);

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE UpdateTagName(in i int(11), in TagNameUpdate varchar(50))
BEGIN
	declare TagNameNew varchar(50);
    declare count1 int;
	 if( substring(TagNameUpdate,1,1)!='#')
    then
		set TagNameNew =(select concat('#',TagNameUpdate));
        set count1 = (select count(*) from tag where tentag = TagNameNew);
        if(count1 >0)
        then
        select 0 as temp;
        end if;
        if(count1 =0)
        then
        update tag set tentag=TagNameNew where id=i;
        select 1 as temp;
        end if;
    end if;
    if(substring(TagNameUpdate,1,1)='#')
		then
        set count1 = (select count(*) from tag where tentag = TagNameUpdate);
        if(count1 >0)
        then
        select 0 as temp;
        end if;
        if(count1 =0)
        then
        update tag set tentag=TagNameUpdate where id=i;
        select 1 as temp;
        end if;
	end if;
END;$$
DELIMITER ;

call UpdateTagName(1,'#hahahhahahahahhahahhahahahhaa');

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE UpdatePasswordAccountByID(in ID int(11), in newPass varchar(100))
BEGIN
	update account a
    set a.password = newPass
    where a.id = ID;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE ResetPassword(in verify varchar(255), in newPass varchar(100))
BEGIN
	update account a
    set a.password = newPass
    where a.chuoixacthuc = verify;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE ChangeStatusAccount(in i int(11), in statusnew varchar(20))
BEGIN
	update account a
    set a.tinhtrang = statusnew
    where a.id = i;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllContract()
BEGIN
	select * from hopdong;
END;$$
DELIMITER ;


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddContract(in ten varchar(255), in nguoi_day int(11), in nguoi_hoc int(11), in tgianky date)
BEGIN
	insert into hopdong(id, tenhopdong, nguoiday, nguoihoc, thoigianky, trangthaihopdong)
    values(null, ten, nguoi_day, nguoi_hoc, tgianky, 'Chưa duyệt');
    SELECT LAST_INSERT_ID() as id;
    #SELECT * FROM hopdong WHERE id = SCOPE_IDENTITY();
END;$$
DELIMITER ;
#call AddContract('Hợp đồng B',38,37,'2019-12-12');

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE UpdateStatusContract(in i int1(11), in status varchar(50))
BEGIN
	update hopdong set trangthaihopdong = status where id =i;
END;$$
DELIMITER ;
#call UpdateStatusContract(1);

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE Add_DieuKhoanHopDong(in idHD int(11), in noi_dung text, in ben_thuc_hien varchar(100))
BEGIN
	insert into dieukhoanhopdong values(null, idHD, noi_dung, ben_thuc_hien);
END;$$
DELIMITER ;


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllContractByTeacherID(in teacherID int(11))
BEGIN
	select hd.id as IDContract, hd.tenhopdong as NameContract, hd.nguoiday as IDTeacher, hd.nguoihoc as IDStudent, hd.thoigianky as TimeAsigned, hd.trangthaihopdong as StatusContract,
    nh.avatar as AvatarStudent, nh.hoten as NameStudent,
    nd.avatar as AvatarTeacher, nd.hoten as NameTeacher
    from hopdong hd, account nd, account nh
    where hd.nguoiday = teacherID and hd.nguoihoc = nh.id and nd.id = teacherID;
END;$$
DELIMITER ;
call GetAllContractByTeacherID(37);


####------------------ CŨ - xài proc dưới page này ----------#
DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetContractByID(in i int(11))
BEGIN
	select distinct hd.id as IDContract, hd.tenhopdong as NameContract, hd.nguoiday as IDTeacher, hd.nguoihoc as IDStudent, hd.thoigianky as TimeAsigned, hd.trangthaihopdong as StatusContract,
    hd.sodiem as ScoreContract, hd.danhgia as CMTContract,
    nh.avatar as AvatarStudent, nh.hoten as NameStudent, nh.email as EmailStudent, nh.sdt as PhoneStudent,
    nd.avatar as AvatarTeacher, nd.hoten as NameTeacher, nd.email as EmailTeacher, nd.sdt as PhoneTeacher,
    c.isRead as IDReadChat
    from hopdong hd, account nd, account nh, chat c join hopdong h on c.idhopdong = i and h.id = i
    where hd.id = i and hd.nguoiday = nd.id and hd.nguoihoc = nh.id;
END;$$
DELIMITER ;
call GetContractByID(2);
####------------------ --------------------------------------- ----------#


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE Get_DieuKhoanHopDong_ByIDContract(in contractID int(11))
BEGIN
	select * from dieukhoanhopdong where sohopdong = contractID;
END;$$
DELIMITER ;

call Get_DieuKhoanHopDong_ByIDContract(11);

#-----------------------------------------------------------#
DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE Add_TaiKhoanNganHang(in chu_tai_khoan int(11), in ten_ngan_hang varchar(255))
BEGIN
	insert into taikhoan values(null, chu_tai_khoan, ten_ngan_hang, 0);
END;$$
DELIMITER ;
call Add_TaiKhoanNganHang(37,'Vietcombank');

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE NapTienVaoTaiKhoan(in IDTaiKhoanNganHang int(11), in nguoi_nap int(11), in so_tien int(11))
BEGIN
	insert into giaodich values(null, IDTaiKhoanNganHang, nguoi_nap, nguoi_nap, 1, so_tien, 'Nộp tiền vào tài khoản');
    update taikhoan t
    set t.sotienconlai = t.sotienconlai + so_tien
    where t.id = IDTaiKhoanNganHang;
END;$$
DELIMITER ;
call NapTienVaoTaiKhoan(1,37,100000);



#-------------------------
DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllContract()
BEGIN
	select hd.id as IDContract, hd.tenhopdong as NameContract, hd.nguoiday as IDTeacher,
    hd.nguoihoc as IDStudent, hd.thoigianky as TimeAsigned, hd.trangthaihopdong as StatusContract,
    nd.hoten as NameTeacher, nh.hoten as NameStudent
    from hopdong hd, account nd, account nh
    where hd.nguoiday = nd.id and hd.nguoihoc = nh.id;
END;$$
DELIMITER ;

call GetAllContract();

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllContractByStudentID(in studentID int(11))
BEGIN
	select hd.id as IDContract, hd.tenhopdong as NameContract, hd.nguoiday as IDTeacher, hd.nguoihoc as IDStudent, hd.thoigianky as TimeAsigned, hd.trangthaihopdong as StatusContract,
    nh.avatar as AvatarStudent, nh.hoten as NameStudent,
    nd.avatar as AvatarTeacher, nd.hoten as NameTeacher
    from hopdong hd, account nd, account nh
    where hd.nguoihoc = studentID and hd.nguoiday = nd.id and nh.id = studentID;
END;$$
DELIMITER ;
call GetAllContractByStudentID(9);

#------------------ CHAT-----------------------#

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddChat(in IDnguoigui int(11), in IDnguoinhan int(11), in nd text, in thoi_gian_chat datetime, in idhd int(11))
BEGIN
	insert into chat values (null, IDnguoigui, IDnguoinhan, nd, thoi_gian_chat, IDnguoinhan, idhd);
    select c.id as ID, c.noidung as NoiDungChat, c.thoigianchat as ThoiGianChat,
    c.nguoigui as IDNguoiGui, c.nguoinhan as IDNguoiNhan,
    ng.hoten as TenNguoiGui, ng.avatar as AvatarNguoiGui,
    nn.hoten as TenNguoiNhan, nn.avatar as AvatarNguoiNhan
    from chat c, account ng, account nn
    where c.id = LAST_INSERT_ID() and IDnguoigui = ng.id and IDnguoinhan = nn.id;
    #----SELECT LAST_INSERT_ID() as id;
END;$$
DELIMITER ;
call AddChat(38,37,'123123','2019-12-22 23:59:59',4);


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetChat(in IDnguoi1 int(11), in IDnguoi2 int(11))
BEGIN
	select c.id as ID, c.noidung as NoiDungChat, c.thoigianchat as  ThoiGianChat,
    c.nguoigui as IDNguoiGui, c.nguoinhan as IDNguoiNhan,
    ng.hoten as TenNguoiGui, ng.avatar as AvatarNguoiGui,
    nn.hoten as TenNguoiNhan, nn.avatar as AvatarNguoiNhan
    from chat c, account ng, account nn
    where (c.nguoigui = IDnguoi1 and  c.nguoinhan = IDnguoi2 
		or c.nguoigui = IDnguoi2 and c.nguoinhan = IDnguoi1)
		and c.nguoigui = ng.id and c.nguoinhan = nn.id;
END;$$
DELIMITER ;
call GetChat(36,38);



DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetChatByIDContract(in IDContract int(11))
BEGIN
	update chat ch set ch.isRead = 0 where ch.idhopdong = IDContract;
	select c.id as ID, c.noidung as NoiDungChat, c.thoigianchat as  ThoiGianChat,
    c.idhopdong as IDHopDong,
    c.nguoigui as IDNguoiGui, c.nguoinhan as IDNguoiNhan,
    ng.hoten as TenNguoiGui, ng.avatar as AvatarNguoiGui,
    nn.hoten as TenNguoiNhan, nn.avatar as AvatarNguoiNhan
    from chat c, account ng, account nn
    where c.nguoigui = ng.id and  c.idhopdong = IDContract and c.nguoinhan = nn.id;
END;$$
DELIMITER ;
call GetChatByIDContract(4);


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE UpdateIsReadFieldChatByID(in IDChat int(11))
BEGIN
	update chat
    set isRead = 0
    where id=IDChat;
END;$$
DELIMITER ;
call UpdateIsReadFieldChatByID(12);

#------------------ Đánh giá hợp đồng-----------------------#

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddCmtContractByID(in IDContract int(11), in cmt text)
BEGIN
	update hopdong
    set danhgia = cmt
    where id = IDContract;
END;$$
DELIMITER ;
call AddCmtContractByID(2,'abcbabab');


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddScoreContractByID(in IDContract int(11), in score int(11))
BEGIN
	update hopdong
    set sodiem = score
    where id = IDContract;
END;$$
DELIMITER ;
call AddScoreContractByID(2,5);


#------------------ Khiếu nại hợp đồng-----------------------#

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddKNHD(in ID_nguoi_KN int(11), in ID_HD int(11), in noi_dung text, in thoi_gian_KN datetime)
BEGIN
	insert into khieunaihopdong values(null, ID_HD, ID_nguoi_KN, noi_dung,thoi_gian_KN);
END;$$
DELIMITER ;
call AddKNHD(37, 1, 'abc','2019-12-12 12:12:12');


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllKNHD()
BEGIN
	select kn.id as IDKNHD, kn.noidung as NoiDungKN, kn.thoigiankhieunai as ThoiGianKN,
			hd.id as IDHD, hd.tenhopdong as TenHD,
            a.hoten as TenNguoiKN, a.avatar as AvatarNguoiKN, v.ten as VaiTroNguoiKN
    from hopdong hd, khieunaihopdong kn, account a, vaitro v
    where kn.sohopdong=hd.id and kn.nguoikhieunai = a.id and v.id = a.vaitro;
END;$$
DELIMITER ;
call GetAllKNHD();

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllKNHDByIDHD(in IDHD int(11))
BEGIN
	select kn.id as IDKNHD, kn.noidung as NoiDungKN, kn.thoigiankhieunai as ThoiGianKN,
			hd.id as IDHD, hd.tenhopdong as TenHD,
            a.hoten as TenNguoiKN, a.avatar as AvatarNguoiKN, v.ten as VaiTroNguoiKN
    from hopdong hd, khieunaihopdong kn, account a, vaitro v
    where kn.sohopdong=IDHD and hd.id = IDHD and kn.nguoikhieunai = a.id and v.id = a.vaitro;
END;$$
DELIMITER ;
call GetAllKNHDByIDHD(4);

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllCMTOfTeacherByID(in IDTeacher int(11))
BEGIN
	select hd.id as IDHopDong, nh.id as IDNguoiDanhGia, nh.hoten as TenNguoiDanhGia, nh.avatar as AvatarNguoiDanhGia, 
    hd.sodiem as SoSao, hd.danhgia as Comment
    from hopdong hd, account nd, account nh
    where hd.nguoiday = IDTeacher and hd.nguoihoc = nh.id and nd.id = IDTeacher
		and ((hd.danhgia != '' and hd.danhgia is not null)or(hd.sodiem is not null and hd.sodiem>0));
END;$$
DELIMITER ;
call GetAllCMTOfTeacherByID(37);
#---------------------------------- giaodich
DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE AddTransaction(in IDNguoiGui int(11), in IDNguoiNhan int(11), in SoGio int(11), 
									in Mota varchar(255), in ThoiGianGiaoDich datetime)
BEGIN
	declare sotien int;
    declare sotiensaucung int;
    set sotien = (select tiendaymotgio from account where id = IDNguoiNhan);
	insert into giaodich values(null, IDNguoiGui, IDNguoiNhan,2,SoGio*sotien, Mota, ThoiGianGiaoDich);
END;$$
DELIMITER ;
call AddTransaction(10,36,4,'new123','2019-12-12 12:12:12');
select * from giaodich;


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetContractByID(in i int(11))
BEGIN
	declare count1 int;
    set count1 =(select count(distinct isRead) from chat where idhopdong = i and isRead>0 and isRead is not null);
    if( count1=0 )
	then 
		select distinct hd.id as IDContract, hd.tenhopdong as NameContract, hd.nguoiday as IDTeacher, hd.nguoihoc as IDStudent, hd.thoigianky as TimeAsigned, hd.trangthaihopdong as StatusContract,
		hd.sodiem as ScoreContract, hd.danhgia as CMTContract,
		nh.avatar as AvatarStudent, nh.hoten as NameStudent, nh.email as EmailStudent, nh.sdt as PhoneStudent,
		nd.avatar as AvatarTeacher, nd.hoten as NameTeacher, nd.email as EmailTeacher, nd.sdt as PhoneTeacher,
		0 as IDReadChat
		from hopdong hd, account nd, account nh
		where hd.id = i and hd.nguoiday = nd.id and hd.nguoihoc = nh.id;
    end if;
    if( count1>0)
	then
		select distinct hd.id as IDContract, hd.tenhopdong as NameContract, hd.nguoiday as IDTeacher, hd.nguoihoc as IDStudent, hd.thoigianky as TimeAsigned, hd.trangthaihopdong as StatusContract,
		hd.sodiem as ScoreContract, hd.danhgia as CMTContract,
		nh.avatar as AvatarStudent, nh.hoten as NameStudent, nh.email as EmailStudent, nh.sdt as PhoneStudent,
		nd.avatar as AvatarTeacher, nd.hoten as NameTeacher, nd.email as EmailTeacher, nd.sdt as PhoneTeacher,
		c.isRead as IDReadChat
		from hopdong hd, account nd, account nh, chat c
		where hd.id = i and hd.nguoiday = nd.id and hd.nguoihoc = nh.id and c.idhopdong = i and c.isRead>0;
	end if;
END;$$
DELIMITER ;
call GetContractByID(11);


#------------------- Lọc giáo viên
DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE FilterTeacher(in diadiem varchar(255), in tienday int(11), in tentag varchar(50))
BEGIN
	declare diadiemNew1 varchar(50);
    declare diadiemNew2 varchar(50);
	declare tagnew1 varchar(50);
    declare tagnew2 varchar(50);  
    
	set diadiemNew1 = (select concat('%',diadiem));
    set diadiemNew2 = (select concat(diadiemNew1,'%'));
    

    set tagnew1 = (select concat('%',tentag));
    set tagnew2 = (select concat(tagnew1,'%'));
    if(tienday=0)
    then
		select distinct a.*
		from account a, tag_account ta, tag t
		where a.vaitro = 2 and a.id = ta.id_account and ta.id_tag = t.id
			and a.diachi like diadiemNew2 and t.tentag like tagnew2;
    end if;
    if(tienday!=0)
    then
		select distinct a.*
		from account a, tag_account ta, tag t
		where a.vaitro = 2 and a.id = ta.id_account and ta.id_tag = t.id
			and a.diachi like diadiemNew2 and a.tiendaymotgio = tienday
			and t.tentag like tagnew2;
    end if;
	
END;$$
DELIMITER ;
call FilterTeacher('HCM', 200, '2');


DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetIsReadByIDContract(in IDContract int(11))
BEGIN
	declare count1 int;
    set count1 = (select count(distinct isRead) from chat where idhopdong = IDContract and isRead>0 and isRead is not null);
    if(count1 = 0)
    then
		select 0;
    end if;
	if(count1>0)
    then
		select distinct c.isRead
        from chat c
        where c.idhopdong = IDContract and c.isRead>0;
    end if;
END;$$
DELIMITER ;
call GetIsReadByIDContract(19);