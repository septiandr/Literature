// import model here
const { users } = require("../../models");
const { literature } = require("../../models");
const { favorite } = require("../../models");

exports.addFavorite = async (req, res) => {
  try {
    const{...data}= req.body
    const newFavorite = await favorite.create({
      ...data
    })
    res.send({
      newFavorite,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getFavorites = async (req, res) => {
  try {
    const data = await favorite.findAll({
      include: [
        {
          model: users,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
        },
        {
            model: literature,
            as: "literature",
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

exports.deleteFavorite = async (req, res) => {
    const { id } = req.params;
    try {
      await favorite.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: "success",
        message: "delete successfully",
      });
    } catch (error) {
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };