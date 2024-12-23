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
  const { id, title, subTitle, description, imgUrl_1, button_name } = input;

  let query = `UPDATE headerlanding SET 
    title = '${title}', 
    subTitle = '${subTitle}', 
    description = '${description}', 
    button_name = '${button_name}'`;

  if (imgUrl_1) {
    query += `, image = '${imgUrl_1}'`; 
  }

  query += ` WHERE id = ${id};`; 

  console.log("Executing query:", query); 

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        output({ error: "An error occurred while updating the database" }, null);
        return;
      }

      output(null, { message: "Header data updated successfully" });
    });
  } catch (e) {
    console.error("Database error:", e);
    output({ error: "Server error occurred" }, null);
  }
};



LandingModal.createHeaderData = (input, output) => {
  const { title, subTitle, description, imgUrl_1, button_name } = input;

  const query = `INSERT INTO headerlanding 
                 (title, subTitle, description, image, button_name) 
                 VALUES ('${title}', '${subTitle}', '${description}', '${imgUrl_1}', '${button_name}');`;

  console.log("Executing Query:", query); 

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        output({ error: "Database error occurred." }, null);
        return;
      }

      output(null, { message: "Header data inserted successfully!" });
    });
  } catch (e) {
    console.error("Error in createHeaderData:", e);
    output({ error: "Server error occurred while inserting header data." }, null);
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
  const { id, title, description } = input;
console.log(input);

  let query = `UPDATE aboutlanding SET title = ?, description = ? WHERE id = ?`;
  
  // Use parameterized queries to avoid SQL injection
  db.query(query, [title, description, id], function (err, result) {
    if (err) {
      console.error("Database query error: ", err);  // Log the error
      output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
      return;
    }

    if (result.affectedRows === 0) {
      output({ error: { description: "No matching record found for the given ID" } }, null);
      return;
    }

    output(null, { message: "SUCCESS" });
  });
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
  const { id, title, subTitle, description, imgUrl } = input;

  let query = `
    UPDATE cardcontent 
    SET title = ?, subTitle = ?, description = ?
  `;

  const params = [title, subTitle, description];

  if (imgUrl) {
    query += `, image = ?`;
    params.push(imgUrl);
  }

  query += ` WHERE id = ?`;
  params.push(id);

  try {
    db.query(query, params, function (err, result) {
      if (err) {
        output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
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
  const { title, subTitle, description, imgUrl } = input;
  const query = `INSERT INTO cardcontent (title, subTitle, description, image) VALUES (?, ?, ?, ?)`;

  try {
    db.query(query, [title, subTitle, description, imgUrl], function (err, result) {
      if (err) {
        output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
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
  const { id, title, imageUrl, button_name1, button_name2 } = input;

  let query = `UPDATE joinsus 
               SET title='${title}', 
                   button_name1='${button_name1}', 
                   button_name2='${button_name2}'`;

  if (imageUrl) {
    query += `, image='${imageUrl}' WHERE id=${id};`;
  } else {
    query += ` WHERE id=${id};`;
  }

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error("SQL Query Error:", err);
        output({ error: { description: "Failed to execute query." } }, null);
        return;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    console.error("Unexpected Error:", e);
    output({ error: { description: "Unexpected error occurred." } }, null);
  }
};


LandingModal.createJoinsUsData = (input, output) => {
  const { title, imgUrl, button_name1, button_name2 } = input; // Use consistent column name
  const query = `
    INSERT INTO joinsus (title, image, button_name1, button_name2)
    VALUES (?, ?, ?, ?);
  `;

  try {
    db.query(query, [title, imgUrl, button_name1, button_name2], (err, result) => {
      if (err) {
        console.error("SQL Query Error:", err); // Log for debugging
        return output({ error: { description: "Failed to execute query." } }, null);
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    console.error("Unexpected Error:", e); // Log for debugging
    return output({ error: { description: "Unexpected error occurred." } }, null);
  }
};


//CaseStudy

LandingModal.getCaseStudysData = (input, output) => {
  const query = `SELECT * FROM socialMedia`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        return output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      console.log("getCaseStudyData", result);
      output(null, result); // Return all rows
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};


LandingModal.updateCaseStudy = (input,output) => {
  const {id, title, subTitle, description,imgUrl, url, } = input;
  let query = `update socialMedia set title= '${title}',subTitle='${subTitle}',description='${description}',url='${url}'`;
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

LandingModal.CreateCaseStudy = (input, callback) => {
  const { title, subTitle, description, imagUrl, url } = input;

  // Ensure all required fields are passed
  if (!title || !subTitle || !description || !imagUrl || !url) {
    return callback({ error: "All fields are required" }, null);
  }

  // Adjust the query to match the table definition
  const query = `
    INSERT INTO socialMedia (title,subTitle, description, image, url)
    VALUES ('${title}', '${subTitle}', '${description}', '${imagUrl}', '${url}');
  `;

  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return callback({ error: "Failed to insert case study into the database" }, null);
      }
      callback(null, { message: "SUCCESS" });
    });
  } catch (error) {
    console.error("Unexpected error in CreateCaseStudy:", error);
    callback({ error: "Unexpected error while creating case study" }, null);
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

LandingModal.updateReviewsData = (input, output) => {
  const { id, title, subTitle, description } = input;

  let query = `UPDATE reviews 
               SET title = '${title}', subTitle = '${subTitle}', description = '${description}' 
               WHERE id = ${id}`; // Add a WHERE clause to filter by ID

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
