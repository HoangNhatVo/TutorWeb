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
	select * from chuyennganh;
END;$$
DELIMITER ;


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
