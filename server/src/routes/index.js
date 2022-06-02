const express = require("express");
const router = express.Router();

const {addUser,getUsers,getUser,updateUser,deleteUser} = require('../controller/user')
const {addLiterature,getLiteratures,getLiterature,updateLiterature,deleteLiterature} = require('../controller/literature')
const { uploadFile } = require("../middleware/uploadFile");
const { uploadPdf } = require("../middleware/uploadPdf");

const { register, login,checkAuth} = require('../controller/auth');

const { auth,adminOnly } = require('../middleware/auth');
const { addFavorite, getFavorites,deleteFavorite } = require("../controller/favorite");

router.post("/user", addUser);
router.get("/users",auth,adminOnly, getUsers);
router.get("/user/:id",auth, getUser);
router.put("/user/:id",auth,uploadFile('image'), updateUser);
router.delete("/user/:id",auth, deleteUser);

router.post("/literature",auth,uploadPdf('image'), addLiterature);
router.get("/literatures",auth, getLiteratures);
router.get("/literature/:id",auth, getLiterature);
router.put("/literature/:id",auth,updateLiterature);
router.delete("/literature/:id",auth,deleteLiterature);

router.post("/favorite", auth, addFavorite);
router.get("/favorites",auth, getFavorites);
router.delete("/favorite/:id",auth, deleteFavorite);


router.post("/register", register)
router.post("/login", login)
router.get("/check-auth/:id", auth, checkAuth);

module.exports = router;