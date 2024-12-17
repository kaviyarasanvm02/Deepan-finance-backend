const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const LandingScreenController = require("../Controller/LandingController");

let landingStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "./public/Docs/Landing/"));
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
      },
});

let landingDocs = multer({ storage: landingStorage });


// ----------------- Customer Routes -----------------

// Landing Header
router.get("/customer/Header",  LandingScreenController.getHeaderData);

// Landing About
router.get("/customer/About", LandingScreenController.getAboutData);

// Landing Tabs
// router.get("/customer/Tabs", LandingScreenController.getTabData);

// Landing Blogs
router.get("/customer/Blogs", LandingScreenController.getBlogData);

// Landing JoinUs
router.get("/customer/JoinUs", LandingScreenController.getJoinUsData);

// Landing CaseStudy
router.get("/customer/CaseStudy", LandingScreenController.getCaseStudyData);

// Landing Reviews
router.get("/customer/Reviews", LandingScreenController.getReviewData);

// ----------------- Admin Routes -----------------

// Header Section

router.get("/admin/Header", LandingScreenController.getHeaderSectionData);
router.post("/admin/Header",landingDocs.array('images',3), LandingScreenController.createHeaderSectionData);
router.put("/admin/Header/:id", landingDocs.array('images',3), LandingScreenController.updateHeaderSection);

// About Section
router.get("/admin/About", LandingScreenController.getAboutSectionData);
router.post("/admin/About", LandingScreenController.createAboutSectionData);
router.put("/admin/About/:id", LandingScreenController.updateAboutSection);

// Tabs Section
// router.get("/admin/Tabs", LandingScreenController.getTabsSectionData);
// router.post("/admin/Tabs", LandingScreenController.createTabsSectionData);
// router.put("/admin/Tabs/:id", LandingScreenController.updateTabsSection);

// Blogs Section
// router.put("/UpdateBlogsTitle/:blogs_title",LandingScreenController.updateBlogsTitle);
router.get("/admin/Blogs", LandingScreenController.getBlogsSectionData);
router.post("/admin/Blogs", landingDocs.array('images',6), LandingScreenController.createBlogsSectionData);
router.put("/admin/Blogs/:id", landingDocs.array('images',6), LandingScreenController.updateBlogsSection);

// JoinUs Section

router.get("/admin/JoinUs",  LandingScreenController.getJoinsUsSectionData);
router.post("/admin/JoinUs", landingDocs.single("image"), LandingScreenController.createJoinUsSectionData);
router.put("/admin/JoinUs/:id", landingDocs.single("image"), LandingScreenController.updateJoinusSection);

// CaseStudy Section
router.get("/admin/CaseStudy", LandingScreenController.getCaseStudy);
router.post("/admin/CaseStudy", landingDocs.single("file"), LandingScreenController.createCaseStudy);
router.put("/admin/CaseStudy/:id", landingDocs.single("file"), LandingScreenController.updateCaseStudy);

// Reviews Section
router.get("/admin/Reviews", LandingScreenController.getReview);
router.post("/admin/Reviews", LandingScreenController.createReview);
router.put("/admin/Reviews/:id", LandingScreenController.updateReview);

module.exports = router;
