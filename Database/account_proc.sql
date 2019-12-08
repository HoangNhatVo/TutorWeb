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

