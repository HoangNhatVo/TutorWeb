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
	select * from account where id = i;
END;$$
DELIMITER ;

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllAccount()
BEGIN
	select * from account;
END;$$
DELIMITER ;
call GetAllTeacher();

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetAllTeacher()
BEGIN
	select * from account where vaitro = 2;
END;$$
DELIMITER ;


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
	select * from tag_account where id_account = accID order by id_tag asc;
END;$$
DELIMITER ;
call GetAllTagByAccID(39);

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
	insert into hopdong values(null, ten, nguoi_day, nguoi_hoc, tgianky, 'Chưa duyệt');
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
	select * from hopdong where nguoiday = teacherID;
END;$$
DELIMITER ;

call GetAllContractByTeacherID(38);

DELIMITER $$
USE `sql12314047`$$
CREATE PROCEDURE GetContractByID(in i int(11))
BEGIN
	select hd.id as IDContract, hd.tenhopdong as NameContract, hd.nguoiday as IDTeacher, hd.nguoihoc as IDStudent, hd.thoigianky as TimeAsigned, hd.trangthaihopdong as StatusContract,
    nh.avatar as AvatarStudent, nh.hoten as NameStudent, nh.email as EmailStudent, nh.sdt as PhoneStudent,
    nd.avatar as AvatarTeacher, nd.hoten as NameTeacher, nd.email as EmailTeacher, nd.sdt as PhoneTeacher
    from hopdong hd, account nd, account nh
    where hd.id = i and hd.nguoiday = nd.id and hd.nguoihoc = nh.id;
END;$$
DELIMITER ;
call GetContractByID(4);

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

