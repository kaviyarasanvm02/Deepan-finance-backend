const Environment = require("../confic/Environment");
const db = require("../confic/db");
const LandingModal = function () {};

//Header
LandingModal.getHeadersData = (input, output) => {
  let query = `SELECT * FROM headerlanding`;
  console.log("In getHeaderData Model");
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      console.log("getHeaderData", result);
      output(null, result);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    console.log("In catch getHeaderData Model");
  }
};

LandingModal.updateHeaderData = (input, output) => {
  const { id, title, subTitle, description, link, imgUrl_1, button_name } =
    input;
  let query = `update headerlanding set title= '${title}',subTitle = '${subTitle}',description = '${description}', button_name = '${button_name}',path =' ${link}',`;
  if (imgUrl_1) {
    query += `, image = '${imgUrl_1}' where id = ${id};`;
  } else {
    query += ` where id = ${id}`;
  }
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

LandingModal.createHeaderData = (input, output) => {
  const { title, subTitle, description, link, imgUrl_1, button_name } = input;

  let query = `INSERT INTO headerlanding
                 (title,subTitle,description,link,images,button_name)
                 VALUES ('${title}','${subTitle}','${description}','${link}','${imgUrl_1}',${button_name}');`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

// //About
LandingModal.getAboutsData = (input, output) => {
  let query = `SELECT * FROM aboutlanding`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      console.log("getAboutData", result);
      output(null, result);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};

LandingModal.updateAboutData = (input, output) => {
  const { title, description } = input;

  let query = `update aboutlanding set title= '${title}',description = '${description}',`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

LandingModal.createAboutData = (input, output) => {
  const { title, description } = input;
  let query = `INSERT INTO aboutlanding
    (title,description)
    VALUES ('${title}','${description}');`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

//Blogs
LandingModal.getBlogsData = (input, output) => {
  let query = `SELECT * FROM cardcontent`;
  console.log("In BlogsData Model");

  try {
    db.query(query, function (err, cardResult) {
      if (err) {
        console.error("Error executing query:", query, err);
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }

      console.log("getBlogsData", cardResult);
      output(null, cardResult);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};

LandingModal.updateBlogsData = (input, output) => {
  const { id, title, subTitle, description, image_1 } = input;
  let query = `update cardcontent set title='${title}',subTitle='${subTitle}',description='${description}'`;
  if (image_1) {
    query += `, image = '${image_1}' where id = ${id};`;
  } else {
    query += ` where id = ${id}`;
  }
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

LandingModal.createBlogsData = (input, output) => {
  const { title, subTitle, description, image_1 } = input;
  let query = `INSERT INTO cardcontent
               (title,subTitle,description,images)
               VALUS ('${title}','${subTitle}','${description}','${image_1}')
               `;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

//JoinUs

LandingModal.getJoinsUsData = (input, output) => {
  let query = `SELECT * FROM joinsus`;
  console.log("In JoinUsData Model");
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      console.log("getJoinUsData", result);
      output(null, result);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    console.log("In catch getHeaderData Model");
  }
};

LandingModal.updateJoinUsData = (input, output) => {
  const { id, title, imageUrl, link1, link2, button_name1, button_name2 } =
    input;
  let query = `update joinsus set title='${title}', path1='${link1}',path2='${link2}',button_name1='${button_name1}',button_name2 = '${button_name2}' `;
  if (imageUrl) {
    query += `, image='${imageUrl}' where id=${id};`;
  } else {
    query += ` where id=${id}`;
  }
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

LandingModal.createJoinsUsData = (input, output) => {
  const { title, imageUrl, link1, link2, button_name1, button_name2 } = input;
  let query = `INSERT INTO joinsus
               (title, images,link1,link2,button_name1,button_name2)
               VALUES ('${title}','${imageUrl}','${link1}','${link2}','${button_name1}','${button_name2}');
               `;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

//CaseStudy

LandingModal.getCaseStudysData = (input,output) => {
  let query = `SELECT * FROM socialMedia`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      console.log("getCaseStudyData", result);
      output(null, result[0]);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};

LandingModal.updateCaseStudy = (input,output) => {
  const {id, title, subTitle, content,imgUrl, url, url_type} = input;
  let query = `update socialMedia set title= '${title}',subTitle='${subTitle}',content='${content}',url='${url}',url_type='${url_type}'`;
  if (imgUrl) {
    query += `,image='${imgUrl}' where id=${id};`;
  } else {
    query += `where id=${id};`;
  }
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

LandingModal.CreateCaseStudy = (input,output) => {
  const {title, subTitle, content, imagUrl} = input;
  let query = `INSERT INTO socialMedia (title,subTitle,content,image)
   VALUES ('${title}','${subTitle}','${content}','${imagUrl});`;
   try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

//Reviews

LandingModal.getReviewsData = (input,output) => {
  let query = `SELECT * FROM  reviews`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      console.log("getReviewsData", result);
      output(null, result);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};

LandingModal.updateReviewsData = (input,output) => {
  const { title,subTitle, description } = input;

  let query = `update reviews set title= '${title}',subTitle='${subTitle}',description = '${description}'`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

LandingModal.createReviewsData = (input,output) => {
  const { title,subTitle, description } = input;
  let query = `INSERT INTO reviews
    (title,subTitle,description)
    VALUES ('${title}','${subTitle}','${description}');`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
}

module.exports = LandingModal;
