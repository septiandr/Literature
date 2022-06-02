// import model here
const { users } = require("../../models");

exports.addUser = async (req, res) => {
  try {
    console.log(req.body)
    await users.create(req.body);
    res.send({
      status: "success",
      message: "Add User",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const data = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data,
    });
   console.log(data)
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const{...data}=req.body
    const photo = req.file.filename
    const update ={
      ...data,
      photo
    }
    await users.update(update, {
      where: {
        id,
      },
    });

    const updatedData = await users.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      data: {
        user: updatedData,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await users.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "delete user success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
