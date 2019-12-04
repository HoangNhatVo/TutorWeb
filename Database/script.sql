create database tutor;
use tutor;
create table account
(
	id int(11) primary key auto_increment not null,
    username varchar(50) not null unique,
    password varchar(100) not null,
    hoten varchar(100) not null,
    email varchar(100) not null unique,
    ngaysinh date default null,
    gioitinh varchar(5) default null,
    vaitro int(11) not null default 1,
    diachi varchar(255) default null,
    thanhpho varchar(255) not null,
    sdt varchar(15) default null,
    tinhtrang varchar(20) not null default 'active',
    avatar varchar(255) default null,
    baigioithieu text not null,
    monhoc varchar(100) default null,
    chuyennganh int(11) not null default 1,
    tiendaymotgio int(11) not null default 0,
	xacthuc boolean not null default false,
	chuoixacthuc varchar(255) default null    
);

create table danhgia
(
	id int(11) primary key auto_increment not null,
    nguoiday int(11) not null,
    nguoihoc int(11) not null,
    sosao int(11) not null default 0
);

alter table danhgia add constraint FK_danhgia_account_nguoiday foreign key (nguoiday) references account(id);
alter table danhgia add constraint FK_danhgia_account_nguoihoc foreign key (nguoihoc) references account(id);

create table vaitro
(
	id int(11) primary key auto_increment not null,    
    ten varchar(20) not null default 'người học'
);

alter table account add constraint FK_account_vaitro foreign key (vaitro) references vaitro(id);

create table chuyennganh
(
	id int(11) primary key auto_increment not null,    
    ten varchar(50) not null
);

alter table account add constraint FK_account_chuyennganh foreign key (chuyennganh) references chuyennganh(id);

create table tag_account
(
	id_tag int(11) not null,    
    id_account int(11) not null,    
    primary key(id_tag, id_account)
);
create table tag
(
	id int(11) primary key auto_increment not null,
    tentag varchar(50) not null
);

alter table tag_account add constraint FK_tagaccount_account foreign key (id_account) references account(id);
alter table tag_account add constraint FK_tagaccount_tag foreign key (id_tag) references tag(id);

create table taikhoan
(
	id int(11) primary key auto_increment not null,
    chutaikhoan int(11) not null,
    sotienconlai int(11) default 0
);
alter table taikhoan add constraint FK_taikhoan_account foreign key (chutaikhoan) references account(id);

create table giaodich
(
	id int(11) primary key auto_increment not null,
    taikhoan int(11) not null,
    nguoigui int(11) not null,
    nguoinhan int(11) not null,
    loaigiaodich int(11) not null,
    sotien int(11) not null default 0,
    mota varchar(255) default null
);
alter table giaodich add constraint FK_giaodich_account_nguoigui foreign key (nguoigui) references account(id);
alter table giaodich add constraint FK_giaodich_account_nguoinhan foreign key (nguoinhan) references account(id);

create table loaigiaodich
(
	id int(11) primary key auto_increment not null,
    ten varchar(50) not null
);
alter table giaodich add constraint FK_giaodich_loaigiaodich foreign key (loaigiaodich) references loaigiaodich(id);

create table chat
(
	id int(11) primary key auto_increment not null,
    nguoigui int(11) not null,
    nguoinhan int(11) not null,
    noidung text not null,
    thoigianchat datetime not null
);
alter table chat add constraint FK_chat_account foreign key (nguoigui) references account(id);
alter table chat add constraint FK_chat_account_nguoinhan foreign key (nguoinhan) references account(id);

create table hopdong
(
	id int(11) primary key auto_increment not null,
    tenhopdong varchar(255) not null,
    nguoiday int(11) not null,
    nguoihoc int(11) not null,
    thoigianky date
);
alter table hopdong add constraint FK_hopdong_account_nguoiday foreign key (nguoiday) references account(id);
alter table hopdong add constraint FK_hopdong_account_nguoihoc foreign key (nguoihoc) references account(id);

create table dieukhoanhopdong
(
	id int(11) primary key auto_increment not null,
    sohopdong int(11) not null,
    noidung text not null,
    benthuchien varchar(100) not null
);
alter table dieukhoanhopdong add constraint FK_dieukhoanhopdong_hopdong foreign key (sohopdong) references hopdong(id);

create table khieunaihopdong
(
	id int(11) primary key auto_increment not null,
    sohopdong int(11) not null,
    nguoihoc int(11) not null,
    noidung text not null,
    thoigiankhieunai datetime not null
);

alter table khieunaihopdong add constraint FK_khieunaihopdong_hopdong foreign key (sohopdong) references hopdong(id);
alter table khieunaihopdong add constraint FK_khieunaihopdong_account foreign key (nguoihoc) references account(id);


#-------------------- thêm dữ liệu mẫu vào bảng loaigiaodich ---------------#
insert into loaigiaodich values(null,'Nộp tiền vào tài khoản');
insert into loaigiaodich values(null,'Chuyển khoản');

select * from loaigiaodich;