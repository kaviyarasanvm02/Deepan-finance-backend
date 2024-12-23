const mysql = require("mysql2");
const Environment = require("./Environment");

// Create a MySQL connection pool
const db = mysql.createPool({
  host: Environment.DATABASEHOST,
  user: Environment.DBUSERNAME,
  password: Environment.DBPASSWORD,
  database: Environment.DATABASENAME,
  port: Environment.DATABASEPORT,
  multipleStatements: true,
  connectionLimit:20,
  queueLimit:5,
});

// Create admin_users table
const Users = `CREATE TABLE IF NOT EXISTS admin_users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;`;

// Create headerlanding table
const createHeaderLanding = `CREATE TABLE IF NOT EXISTS headerlanding (
  id INT NOT NULL AUTO_INCREMENT,
  subTitle VARCHAR(70) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description VARCHAR(200) NOT NULL,
  image VARCHAR(255) NOT NULL, 
  button_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;`;

// Create aboutlanding table
const createAboutLanding = `CREATE TABLE IF NOT EXISTS aboutlanding (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(70) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;`;

// Create cardcontent table
const createCardContent = `CREATE TABLE IF NOT EXISTS cardcontent (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  subTitle VARCHAR(100) NOT NULL,
  description VARCHAR(200) NOT NULL,
  image VARCHAR(50) NOT NULL, 
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;`;

// Create joinsus table
const createJoinUs = `CREATE TABLE IF NOT EXISTS joinsus (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  button_name1 VARCHAR(50) NOT NULL,
  button_name2 VARCHAR(50) NOT NULL,
  image VARCHAR(255) NOT NULL, 
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;`;

// Create socialMedia table
const createSocialMedia = `CREATE TABLE IF NOT EXISTS socialMedia (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  subTitle VARCHAR(50) NOT NULL,
  description VARCHAR(500) NOT NULL,
  image VARCHAR(255) NOT NULL, 
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;`;

// Create reviews table
const createReviews = `CREATE TABLE IF NOT EXISTS reviews (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  subTitle VARCHAR(100) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;`;

// Create form table
const createForm = `CREATE TABLE IF NOT EXISTS form (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  companyName VARCHAR(255) NOT NULL,
  message VARCHAR(500) NOT NULL, -- Fixed typo
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;`;

// Insert default admin user (Password hashing recommended!)
const adduser = `INSERT INTO admin_users (name, email, password) VALUES('deepanindia', 'info@deepanindia.in', 'admin');`;
try {
  db.query(createHeaderLanding, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  db.query(createAboutLanding, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  db.query(createCardContent, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  db.query(createJoinUs, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  db.query(createSocialMedia, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  db.query(createReviews, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  db.query(createForm, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  db.query(Users, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    }
  });

  db.query(`SELECT * FROM deepanindia.admin_users;`, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      if (!result.length) {
        db.query(adduser, (err) => {
          console.log(err);
        });
      }
    }
  });
} catch (e) {
  console.log(e);
  throw e;
}

module.exports =  db ;
