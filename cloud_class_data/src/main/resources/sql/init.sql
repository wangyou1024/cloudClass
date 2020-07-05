create table teacher (
tid 			varchar(15) not null unique,
tphone 		varchar(11) not null unique,
temail 		varchar(50) not null,
tpassword varchar(50) not null,
tname 		varchar(20) not null,
tcollege 	varchar(20) not null,
timage 		varchar(20),
constraint t_pk primary key(tid, tphone)
);
create table student (
sid 			varchar(15) not null unique,
sphone 		varchar(11) not null unique,
semail 		varchar(50) not null,
spassword varchar(50) not null,
snum 			varchar(11) not null,
sname 		varchar(20) not null,
scollege 	varchar(11) not null,
simage 		varchar(20),
constraint s_pk primary key(sid, sphone)
);
create table course (
cid 			varchar(15) not null unique,
tid 			varchar(15) not null,
cname 		varchar(20) not null,
cdate 		date not null,
cnum		 	int default 0,
invite 		varchar(20) not null,
archive 	int not null default 0,
constraint c_pk primary key(cid),
constraint tc_fk foreign key (tid) references teacher(tid)
);
create table sc (
scid 			varchar(15) not null unique,
sid				varchar(15) not null,
cid 			varchar(15) not null,
grade 		float(2) not null default 0.0,
sort 			int not null default 0,
constraint sc_pk primary key(scid),
constraint ssc_fk foreign key(sid) references student(sid),
constraint csc_fk foreign key(cid) references course(cid)
);
create table tc (
tcid 			varchar(15) not null unique,
tid 			varchar(15) not null,
cid 			varchar(15) not null,
tarchive 	int not null default 0,
job 			int not null default 1,
tsort 		int not null default 0,
constraint tc_pk primary key(tcid),
constraint ttc_fk foreign key(tid) references teacher(tid),
constraint ctc_fk foreign key(cid) references course(cid)
);
create table message (
mid 			varchar(15) not null unique,
tid 			varchar(15) not null,
mtitle 		varchar(50) not null,
mcontent 	text,
mpublish 	datetime not null default now(),
mnum 			int not null default 0,
constraint m_pk primary key(mid),
constraint tm_fk foreign key(tid) references teacher(tid)
);
create table sm (
rid 			varchar(15) not null unique,
sid 			varchar(15) not null,
mid 			varchar(15) not null,
isread 		int not null default 0,
constraint sm_pk primary key(rid),
constraint ssm_fk foreign key(sid) references student(sid),
constraint msm_fk foreign key(mid) references message(mid)
);
create table twork (
twid 			varchar(15) not null unique,
tid 			varchar(15) not null,
cid 			varchar(15) not null,
wtitle 		varchar(50) not null,
tcontent 	text,
tpublish 	datetime not null default now(),
deadline 	datetime not null,
scale 		float(2) not null default 0.0,
constraint tw_pk primary key(twid),
constraint ttw_fk foreign key(tid) references teacher(tid),
constraint ctw_fk foreign key(cid) references course(cid)
);
create table swork (
swid 			varchar(15) not null unique,
twid 			varchar(15) not null,
sid 			varchar(15) not null,
scontent 	text,
spublish 	datetime not null default now(),
correct 	int not null default 0,
score 		float(2) not null default 0.0,
constraint sw_pk primary key(swid),
constraint twsw_fk foreign key(twid) references twork(twid),
constraint ssw_fk foreign key(sid) references student(sid)
);
create table attachment (
aid 			varchar(15) not null unique,
twid 			varchar(15) not null,
tsid 			varchar(15) not null,
tid 			varchar(15),
filename 	varchar(50) not null,
type 			int not null default 0,
constraint a_pk primary key(aid),
constraint twa_fk foreign key(twid) references twork(twid)
);

-- 清除数据
delete from sm;
delete from message;
delete from swork;
delete from twork;
delete from sc;
delete from tc;
delete from course;
delete from student;
delete from teacher;

-- 修改结构
alter table swork
add column correction text;

alter table message
modify column mpublish DATE NOT NULL;

ALTER TABLE TWORK
MODIFY COLUMN TPUBLISH DATE NOT NULL;

ALTER TABLE TWORK
MODIFY COLUMN DEADLINE DATE NOT NULL;

ALTER TABLE SWORK
MODIFY COLUMN SPUBLISH DATE NOT NULL;

alter table message
drop foreign key tm_fk;

alter table message change tid cid varchar(15);

alter table message
add constraint cm_fk foreign key (cid)
references course(cid);

alter table sc
add column sarchive int ;

alter table course
modify column cdate varchar(15);















