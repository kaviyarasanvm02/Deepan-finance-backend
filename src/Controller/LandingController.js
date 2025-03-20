const LandingModal = require("../Modals/LandingModal");
const path = require("path");
const Environment = require("../confic/Environment");
const { log } = require("console");

//Header
exports.getHeaderData = (req, res) => {
  let responseSent = false;

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getHeadersData(req, (headerErr, headerData) => {
      console.log("headerData", headerData);

      if (headerErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }
      sendResponse(200, headerData);
    });
  } catch (e) {
    console.log("getHeaderData Controller catch", e);
    sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getHeaderSectionData = ({}, res) => {
  try {
    LandingModal.getHeadersData({}, (err, data) => {
      if (err)
        res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      else res.send(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.createHeaderSectionData = (req, res) => {
  const { title, subTitle, description, button_name } = req.body;
  const image = req.file; // Single file upload is available as req.file

  console.log("Request Body:", req.body);
  console.log("Uploaded File:", image);

  // Validate required fields
  if (!title || !subTitle || !description || !button_name || !image) {
    return res
      .status(400)
      .send({ error: "All fields are required, including the image." });
  }

  try {
    // Build image URL
    const imgUrl_1 = `/Docs/Landing/${image.filename}`;

    // Call model function to create header data
    LandingModal.createHeaderData(
      {
        title,
        subTitle,
        description,
        button_name,
        imgUrl_1,
      },
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .send({ error: "Failed to create header section." });
        }
        res
          .status(201)
          .send({ message: "Header section created successfully!", data });
      }
    );
  } catch (e) {
    console.error("Error in createHeaderSectionData:", e);
    res.status(500).send({ error: "An unexpected server error occurred." });
  }
};

exports.updateHeaderSection = (req, res) => {
  const id = req.params.id;
  const { title, subTitle, description, button_name } = req.body;
  const image = req.file;
  console.log("Uploaded image:", image);

  if (!id || !title || !subTitle || !description || !button_name) {
    return res.status(400).send({ error: "All fields are required" });
  }

  try {
    const imgUrl_1 = `/Docs/Landing/${image.filename}`;

    LandingModal.updateHeaderData(
      {
        id,
        title,
        subTitle,
        description,
        imgUrl_1,
        button_name,
      },
      (err, data) => {
        if (err) {
          return res.status(500).send({ error: "Server error occurred" });
        }
        res.send(data);
      }
    );
  } catch (e) {
    res.status(500).send({ error: "Server error occurred" });
    throw e;
  }
};

//About
exports.getAboutData = (req, res) => {
  let responseSent = false;

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getAboutsData(req, (aboutErr, aboutData) => {
      if (aboutErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }
      sendResponse(200, aboutData);
    });
  } catch (e) {
    console.log("getAboutData Controller catch", e);
    sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getAboutSectionData = ({}, res) => {
  try {
    LandingModal.getAboutsData({}, (err, data) => {
      if (err)
        res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      else res.send(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.createAboutSectionData = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  if (!title || !description) {
    console.log("Missing fields: title or description");
    return res.sendStatus(Environment.BAD_REQUEST);
  }

  LandingModal.createAboutData({ title, description }, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
    }
    console.log("Data inserted successfully");
    res.send(data); // Ensure this runs only once
  });
};


exports.updateAboutSection = (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  if (!id || !title || !description) {
    return res.status(400).send({ error: "All fields are required" });
  }
  try {
    LandingModal.updateAboutData(
      {
        id,
        title,
        description,
      },
      (err, data) => {
        if (err) {
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        } else {
          res.send(data);
        }
      }
    );
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

// //Tabs
// exports.getTabsData = (req,res) => {
//   let responseSent = false;

//   const sendResponse = (status, data) => {
//     if (!responseSent) {
//       responseSent = true;
//       res.status(status).send(data);
//     }
//   };
//   try {
//     LandingModal.getTabData(req, (tabsErr, tabsData) => {
//       if (tabsErr) {
//         return sendResponse(Environment.SERVER_ERROR, {
//           error: Environment.SERVER_ERROR_MESSAGE,
//         });
//       }
//       sendResponse(200, { tabsData });
//     });
//   } catch (e) {
//     console.log("getTabsData Controller catch", e);
//     sendResponse(Environment.SERVER_ERROR, {
//       error: Environment.SERVER_ERROR_MESSAGE,
//     });
//   }
// };

// exports.getTabsSectionData = ({},res) => {
//   try {
//     LandingModal.getTabsData({}, (err, data) => {
//       if (err)
//         res
//           .status(Environment.SERVER_ERROR)
//           .send({ error: Environment.SERVER_ERROR_MESSAGE });
//       else res.send(data);
//     });
//   } catch (e) {
//     res
//       .status(Environment.SERVER_ERROR)
//       .send({ error: Environment.SERVER_ERROR_MESSAGE });
//     throw e;
//   }
// };

// exports.createTabsSectionData =(req,res) => {

// };

//Blogs

// exports.updateBlogsTitle = (req, res) => {
//   const blogs_title = req.params.blogs_title;
//   if (!blogs_title) {
//     res.sendStatus(Environment.BAD_REQUEST);
//   } else {
//     try {
//       LandingModal.getBlogsTitle({}, (err, data) => {
//         if (err)
//           res
//             .status(Environment.SERVER_ERROR)
//             .send({ error: Environment.SERVER_ERROR_MESSAGE });
//         else res.send(data);
//       });
//       LandingModal.updateBlogsTitle(
//         {
//           articles_title,
//         },
//         (err, data) => {
//           if (err) {
//             res
//               .status(Environment.SERVER_ERROR)
//               .send({ error: Environment.SERVER_ERROR_MESSAGE });
//           } else {
//             res.send(data);
//           }
//         }
//       );
//     } catch (e) {
//       res
//         .status(Environment.SERVER_ERROR)
//         .send({ error: Environment.SERVER_ERROR_MESSAGE });
//       throw e;
//     }
//   }
// };

exports.getBlogData = (req, res) => {
  let responseSent = false;

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getBlogsData(req, (blogsErr, blogsData) => {
      if (blogsErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }
      sendResponse(200, blogsData);
    });
  } catch (e) {
    console.log("getBlogsData Controller catch", e);
    sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getBlogsSectionData = ({}, res) => {
  try {
    LandingModal.getBlogsData({}, (err, data) => {
      if (err)
        res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      else res.send(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};
exports.getOneBlogSectionData = (req, res) => {
  const { id } = req.params; 

  if (!id) {
    return res.status(400).send({ error: "Blog ID is required" });
  }

  try {
    LandingModal.getOneBlogData(id, (err, data) => {
      if (err) {
        return res
          .status(Environment.SERVER_ERROR)
          .send({ error: err.error.description });
      } else {
        return res.send(data);
      }
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
  }
};

exports.createBlogsSectionData = (req, res) => {
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const description = req.body.description;
  const image = req.file;

  if (!title || !subTitle || !description || !image) {
    return res.status(400).send({ error: "All fields are required, including the image." });
  }

  try {
    const imgUrl = `/Docs/Landing/${image.filename}`;
    LandingModal.createBlogsData(
      { title, subTitle, description, imgUrl },
      (err, data) => {
        if (err) {
          res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
        } else {
          res.send(data);
        }
      }
    );
  } catch (e) {
    res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};
exports.updateBlogsSection = (req, res) => {
  console.log("Params:", req.params);
  console.log("Body:", req.body);
  console.log("File:", req.file);

  const id = req.params.id;
  const { title, subTitle, description } = req.body;
  const image = req.file;

  if (!id || !title || !subTitle || !description) {
    console.error("Missing required fields.");
    return res.status(400).send({ error: "ID, title, subTitle, and description are required." });
  }

  try {
    const imgUrl = image ? `/Docs/Landing/${image.filename}` : undefined;

    LandingModal.updateBlogsData(
      {
        id,
        title,
        subTitle,
        description,
        imgUrl,
      },
      (err, data) => {
        if (err) {
          console.error("Database Update Error:", err);
          return res.status(500).send({ error: "Something went wrong!" });
        }
        res.send(data);
      }
    );
  } catch (e) {
    console.error("Unexpected Error:", e);
    res.status(500).send({ error: "Something went wrong!" });
  }
};




//JoinUs
exports.getJoinUsData = (req, res) => {
  let responseSent = false;

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getJoinsUsData(req, (joinsUsErr, joinUsData) => {
      if (joinsUsErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }
      sendResponse(200, { joinUsData });
    });
  } catch (e) {
    console.log("getJoinUsData Controller catch", e);
    sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getJoinsUsSectionData = ({}, res) => {
  try {
    LandingModal.getJoinsUsData({}, (err, data) => {
      if (err)
        res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      else res.send(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.createJoinUsSectionData = (req, res) => {

  const { title, button_name1, button_name2 } = req.body;
  const image = req.file;
  if (!title ||  !button_name1 || !button_name2 || !image) {
    return res
      .status(400)
      .send({ error: "All fields are required, including the image." });
  } else {
    try {
        const imgUrl = `/Docs/Landing/${image.filename}`;
        LandingModal.createJoinsUsData(
          { title, imgUrl, button_name1, button_name2 },
          (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
          }
        );
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.updateJoinusSection = (req, res) => {
  console.log("Request Params:", req.params);
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const id = req.params.id;
  const {title,button_name1,button_name2} = req.body;
  const image = req.file;

  if (!id || !title || !button_name1 || !button_name2) {
    return res.status(400).send({ error: "ID, title, and button names are required." });
  }


  try {
    const imageUrl = `/Docs/Landing/${image.filename}`;

    LandingModal.updateJoinUsData(
      {
        id,
        title,
        imageUrl,
        button_name1,
        button_name2,
      },
      (err, data) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).send({ error: "Internal Server Error" });
        }
        res.send(data);
      }
    );
  } catch (e) {
    console.error("Unexpected Error:", e);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//caseStudy
exports.getCaseStudyData = (req, res) => {
  let responseSent = false;

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getCaseStudysData(req, (caseStudyErr, caseStudyData) => {
      if (caseStudyErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }
      sendResponse(200, { caseStudyData });
    });
  } catch (e) {
    console.log("getCaseStudyData Controller catch", e);
    sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getCaseStudy = (req, res) => {
  try {
    LandingModal.getCaseStudysData({}, (err, data) => {
      if (err) {
        return res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      }

      // Format image URL
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const formattedData = data.map((item) => ({
        ...item,
        image: `${baseUrl}${item.image}`, // Append base URL to image path
      }));

      res.send(formattedData);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};


exports.createCaseStudy = (req, res) => {
  try {
    const { title, subTitle, description } = req.body;
    const image = req.file;
    const url = req.body.url;

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Check for missing fields
    if (!title || !subTitle || !description || !url || !image) {
      console.error("Missing Fields:", {
        title: !title ? "Missing" : "Provided",
        subTitle: !subTitle ? "Missing" : "Provided",
        description: !description ? "Missing" : "Provided",
        url: !url ? "Missing" : "Provided",
        file: !image ? "Missing" : "Provided",
      });
      return res.status(400).json({ error: "All fields are required" });
    }

    const imageUrl = `/Docs/Landing/${image.filename}`;

    // Insert data into the database
    LandingModal.CreateCaseStudy(
      { title, subTitle, description, imagUrl: imageUrl, url },
      (err, data) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ error: "An error occurred while creating the case study" });
        }
        res.status(201).json({ message: "Case study created successfully", data });
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "An unexpected error occurred on the server" });
  }
};



exports.updateCaseStudy = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const description = req.body.description; // Fixed the key from `content` to `description`
  const url = req.body.url;
  const image = req.file ? `/Docs/Landing/${req.file.filename}` : null; // Handle optional image

  // Validate required fields except `image`
  if (!id || !title || !subTitle || !description || !url) {
    return res.status(400).send({ error: "All fields except image are required" });
  }

  try {
    const updateData = {
      id,
      title,
      subTitle,
      description,
      url,
    };

    // Add `imgUrl` only if a new image is uploaded
    if (image) {
      updateData.imgUrl = image;
    }

    LandingModal.updateCaseStudy(updateData, (err, data) => {
      if (err) {
        return res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      }
      res.send(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

//Reviews
exports.getReviewData = (req, res) => {
  let responseSent = false;

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getReviewsData(req, (reviewErr, reviewData) => {
      if (reviewErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }
      sendResponse(200, { reviewData });
    });
  } catch (e) {
    console.log("getReviewData Controller catch", e);
    sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getReview = ({}, res) => {
  try {
    LandingModal.getReviewsData({}, (err, data) => {
      if (err)
        res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      else res.send(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.createReview = (req, res) => {
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const description = req.body.description;
  if (!title || !subTitle || !description) {
    return res.status(400).send({ error: "All fields are required" });
  } else {
    try {
      LandingModal.createReviewsData(
        {
          title,
          subTitle,
          description,
        },
        (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else res.send(data);
        }
      );
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.updateReview = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const description = req.body.description;
  if (!id || !title || !subTitle || !description) {
    return res.status(400).send({ error: "All fields are required" });
  } else {
    try {
      // LandingModal.getReviewsData({}, (err, data) => {
      //   if (err)
      //     res
      //       .status(Environment.SERVER_ERROR)
      //       .send({ error: Environment.SERVER_ERROR_MESSAGE });
      //   else res.send(data);
      // });
      LandingModal.updateReviewsData(
        {
          id,
          title,
          subTitle,
          description,
        },
        (err, data) => {
          if (err) {
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          } else {
            res.send(data);
          }
        }
      );
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};
