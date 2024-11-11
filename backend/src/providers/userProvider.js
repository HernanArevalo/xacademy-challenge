const { User } = require('../models')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const playerProvider = require('./playerProvider');

const registerUser = async ({ name, email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      const malePlayer = await playerProvider.createPlayer('male', {});
      const femalePlayer = await playerProvider.createPlayer('female', {});

      const newUser = await User.create({
        name: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
        male_player_id: malePlayer.dataValues.id,
        female_player_id: femalePlayer.dataValues.id
      });
      
      return newUser;
    }
  
  } catch (error) {
    throw new Error(error);
  }
};


const loginUser = async ({email, password}) => {
  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({id:user.id, name:user.name}, 'secret_key', { expiresIn: '1h' });

    return {
      token, 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      female_player_id: user.female_player_id, 
      male_player_id: user.male_player_id
    };

  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (id, userOptions)=>{
  try{
    await getUser(id)
    const res = await User.update(userOptions,
      { where: { id },
        returning: true
      },
);
    return User.findByPk(id);
  }catch (error){
    throw new Error(error);
  }
};

const deleteUser = async (id)=>{
  try{
    return await User.destroy( { where: { id } },

);
  }catch (error){
    throw new Error(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser
}

