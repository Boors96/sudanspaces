module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      verification_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_verified:{
          type : Sequelize.BOOLEAN,
          defaultValue: 0
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
    return User;
  };