// import model here
const { users } = require("../../models");
const { literature } = require("../../models");

exports.addLiterature = async (req, res) => {
  try {
    const{...data}= req.body
    const newliterature = await literature.create({
      ...data,image:req.file.filename
    })
    res.send({
      newliterature,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getLiteratures = async (req, res) => {
  try {
    const data = await literature.findAll({
      include: [
        {
          model: users,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getLiterature = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await literature.findOne({
      where: {
        id,
      },
      include: [
        {
          model: users,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt","id"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      data,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateLiterature = async (req, res) => {
  try {
    const { id } = req.params;
    const{...data}=req.body
    const update ={
      ...data,
    }
    await literature.update(update, {
      where: {
        id,
      },
    });

    const updatedData = await literature.findOne({
      where:{
        id,
      }

    });
    res.send({
      status: "success",
      data: {
        literature: updatedData,
      },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.deleteLiterature = async (req, res) => {
  const { id } = req.params;
  try {
    await literature.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "delete literature successfully",
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};