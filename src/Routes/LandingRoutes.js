const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const LandingScreenController = require("../Controller/LandingController");

// Ensure Upload Folder Exists
const uploadPath = path.join(__dirname, "../../public/Docs/Landing/");
const fs = require("fs");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer Configuration
const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storageImage });

// ----------------- Customer Routes -----------------

router.get("/customer/Header", LandingScreenController.getHeaderData);
router.get("/customer/About", LandingScreenController.getAboutData);
router.get("/customer/Blogs", LandingScreenController.getBlogData);
router.get("/customer/JoinUs", LandingScreenController.getJoinUsData);
router.get("/customer/CaseStudy", LandingScreenController.getCaseStudyData);
router.get("/customer/Reviews", LandingScreenController.getReviewData);

// ----------------- Admin Routes -----------------

// Header Section
router.get("/admin/Header", LandingScreenController.getHeaderSectionData);
router.post("/admin/Header", upload.single("images"), LandingScreenController.createHeaderSectionData);
router.put("/admin/Header/:id", upload.single("images"), LandingScreenController.updateHeaderSection);

// About Section
router.get("/admin/About", LandingScreenController.getAboutSectionData);
router.post("/admin/About", LandingScreenController.createAboutSectionData);
router.put("/admin/About/:id", LandingScreenController.updateAboutSection);

// Blogs Section
router.get("/admin/Blogs", LandingScreenController.getBlogsSectionData);
router.post("/admin/Blogs", upload.single("image"), LandingScreenController.createBlogsSectionData);
router.put("/admin/Blogs/:id", upload.single("image"), LandingScreenController.updateBlogsSection);



// JoinUs Section
router.get("/admin/JoinUs", LandingScreenController.getJoinsUsSectionData);
router.post("/admin/JoinUs", upload.single("image"), LandingScreenController.createJoinUsSectionData);
router.put("/admin/JoinUs/:id", upload.single("image"), LandingScreenController.updateJoinusSection);

// CaseStudy Section
router.get("/admin/CaseStudy", LandingScreenController.getCaseStudy);
// router.post("/admin/CaseStudy", upload.single("file"), LandingScreenController.createCaseStudy);
router.post("/admin/CaseStudy", upload.single("image"), LandingScreenController.createCaseStudy);
router.put("/admin/CaseStudy/:id", upload.single("image"), LandingScreenController.updateCaseStudy);

// Reviews Section
router.get("/admin/Reviews", LandingScreenController.getReview);
router.post("/admin/Reviews", LandingScreenController.createReview);
router.put("/admin/Reviews/:id", LandingScreenController.updateReview);

module.exports = router;
