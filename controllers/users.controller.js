import User from "../models/user.model.js";

const users = ["Raaz", "Samrat", "Roshan"];

export const getUsers = (req, res) => {
   //find all users from database
   res.status(200).json({
      status: true,
      data: users,
      message: "user fetched successfully"
   })
}

export const createUser = (req, res) => {
    const { name } = req.body;
    if(!name){
        res.status(400).json({
            status: false,
            message: "Name is required"
        })
    }
    users.push(name);

    res.status(200).json({
        status: true,
        users,
        message: "User created successfully"
    })
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    users[id] = name;

    res.status(200).json({
        status: true,
        users,
        message: "User updated successfully"
    })
}

export const deleteUser = (req, res) => {
    const { id } = req.params;

    delete users[id];

    res.status(200).json({
        status: true,
        users,
        message: "User deleted successfully"
    })

}

//register

export const registerUser = async (req, res) => {
     try {
        const { name, email, password } = req.body;

        const currentUser = await User.findOne({email});

        if(!currentUser) {
            const user =  new User(req.body);
            await user.save();

            res.status(200).json({
                status: true,
                data: user,
                message: "User created successfully"
            })
        }else{
            res.status(400),json({
                status: false,
                message: "Email already registered"
            })
        }
     } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        })
     }
}

//Login

export const loginUser = async (req, res) => {
     try {
        const { email, password } = req.body;

        const user =  await User.findOne({email});

        if(!user){
            res.status(401).json({
                status: false,
                message:"Invalid username or password"
            })
        }else{
            const matchPassword =  await user.matchPassword(password);
            console.log(matchPassword);
            if(matchPassword){
                res.status(200).json({
                    status: true,
                    data: 'jwt token',
                    message: "User logged in successfully"
                })
            }else{
                return res.status(400).json({
                    status: false,
                    message: "Invalid password"
                })
            }
        }
     } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message,
        })
     } 
} 