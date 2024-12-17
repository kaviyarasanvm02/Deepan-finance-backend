const LandingModal = require("../Modals/LandingModal");
const path = require("path");
const Environment = require("../confic/Environment");
const { log } = require("console");

//Header
exports.getHeaderData = (req, res) => {
  let responseSent = false;
console.log("success");

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getHeadersData(req, (headerErr, headerData) => {
      if (headerErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }
      sendResponse(200, headerData );
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
  const { title, subTitle, description, link, button_name } = req.body;
  const images = req.files;

  if (!title || !subTitle || !description || !images || images.length === 0) {
    return res.status(Environment.BAD_REQUEST).send({ error: "All fields are required" });
  }

  try {
    const imgUrl_1 = images[0] ? "/Docs/Landing/" + images[0].filename : "";

    LandingModal.createHeaderData(
      {
        title,
        subTitle,
        description,
        link,
        button_name,
        imgUrl_1,
      },
      (err, data) => {
        if (err) {
          return res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        }
        res.send(data);
      }
    );
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.updateHeaderSection = (req, res) => {
  const id = req.params.id;
  const { title, subTitle, description, link, button_name } = req.body;
  const images = req.files;

  if (!id || !title || !subTitle || !description || !link || !button_name) {
    return res.status(Environment.BAD_REQUEST).send({ error: "All fields are required" });
  }

  try {
    let imgUrl_1 = "";

    if (images && images.length > 0) {
      imgUrl_1 = "/Docs/Landing/" + images[0].filename;
    }

    LandingModal.getHeadersData({}, (err, data) => {
      if (err) {
        return res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      }
    });

    LandingModal.updateHeaderData(
      {
        id,
        title,
        subTitle,
        description,
        link,
        imgUrl_1,
        button_name,
      },
      (err, data) => {
        if (err) {
          return res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        }
        res.send(data);
      }
    );
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
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
      sendResponse(200,  aboutData );
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
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      LandingModal.createAboutData(
        {
          title,
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

exports.updateAboutSection = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  if (!id || !title || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      LandingModal.getAboutsData({}, (err, data) => {
        if (err)
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        else res.send(data);
      });
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
      sendResponse(200,  blogsData );
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

exports.createBlogsSectionData = (req, res) => {
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const description = req.body.description;
  const images = req.files;
  if (!title || !subTitle || !description || !images) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = images?.image_1
      ? "/Docs/Landing" + images.image_1[0].filename
      : "";
    try {
      LandingModal.createBlogsData(
        {
          title,
          subTitle,
          description,
          imgUrl,
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

exports.updateBlogsSection = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const images = req.files;
  const description = req.body.description;
  if (!id || !title || !subTitle || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (images) {
        const image_1 = images?.image_1
          ? "/Docs/Landing/" + images.image_1[0].filename
          : "";
          LandingModal.getBlogsData({}, (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
          });
        LandingModal.updateBlogsData(
          {
            id,
            title,
            subTitle,
            description,
            image_1,
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
      }
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
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
  const title = req.body.title;
  const image = req.file;
  const button_name1 = req.body.button_name1;
  const button_name2 = req.body.button_name2;
  const link1 = req.body.link;
  const link2 = req.body.link;
  if (!title ) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if(image) {
      const imgUrl = "/Docs/Landing/" + req.file.filename;
      LandingModal.createJoinsUsData(
        { title, imgUrl, link1, link2, button_name1, button_name2 },
        (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else res.send(data);
        }
      );
    }
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.updateJoinusSection = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const link1 = req.body.link1;
  const link2 = req.body.link2;
  const button_name1 = req.body.button_name;
  const button_name2 = req.body.button_name;
  const images = req.file;
  if (
    !id ||
    !title ||
    !link1 ||
    !link2 ||
    !button_name1 ||
    !button_name2
  ) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (images) {
        const imageUrl = images?.image_1
          ? "/Docs/Landing" + images.image_1[0].filename
          : "";
        LandingModal.getJoinsUsData({}, (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else res.send(data);
        });
        LandingModal.updateJoinUsData(
          {
            id,
            title,
            imageUrl,
            link1,
            link2,
            button_name1,
            button_name2,
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
      }
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
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

exports.getCaseStudy = ({}, res) => {
  try {
    LandingModal.getCaseStudysData({}, (err, data) => {
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

exports.createCaseStudy = (req, res) => {
  const title = req.body.title;
  const subTitle = req.body.description;
  const content = req.body.content;
  const image = req.file;
  if (!title || !subTitle || !content || !image) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imagUrl = "/Docs/Landing/" + req.file.filename;
    try {
      LandingModal.CreateCaseStudy(
        { title, subTitle, content, imagUrl },
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

exports.updateCaseStudy = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const content = req.body.content;
  const url = req.body.url;
  const url_type = req.body.url_type;
  const image = req.file;
  if (!id || !title || !subTitle || !content) {
    res.sendStatus(Environment.BAD_REQUEST);
  }
  try {
    if (image) {
      const imgUrl = "/Docs/Landing/" + req.file.filename;
      LandingModal.getCaseStudysData(
        { id, title, subTitle, content, imgUrl, url, url_type },
        (err, data) => {
          if (err) {
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          }
          res.send(data);
        }
      );
    } else {
      LandingModal.updateCaseStudy(
        { id, title, subTitle, content, url, url_type },
        (err, data) => {
          if (err) {
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          }
          res.send(data);
        }
      );
    }
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

//Reviews
exports.getReviewData = (req,res) => {
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

exports.getReview = ({},res) => {
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

exports.createReview = (req,res) => {
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const description = req.body.description;
  if (!title || !subTitle || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
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

exports.updateReview = (req,res) => {
  const id = req.params.id;
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const description = req.body.description;
  if (!id || !title || !subTitle || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      LandingModal.getReviewsData({}, (err, data) => {
        if (err)
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        else res.send(data);
      });
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