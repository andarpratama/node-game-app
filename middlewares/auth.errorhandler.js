module.exports = (err, req, res, next) => {
    let code;
    let name = err.name;
    let message;
    let error;
  
    switch (name) {
      case "Missing_Token":
        code = 401;
        message = "Nothing access token ...";
        break;
  
      case "Invalid_Token":
        code = 500;
        message = "Invalid token..";
        break;
  
      case "Failed_register":
        code = 500;
        message = "Failed to register..";
        break;
  
      case "Failed_login":
        code = 500;
        message = "Failed to login..";
        break;
  
      case "Name Required":
        code = 422;
        message = "Name Required: Your name is required to perform this action";
        error = { name: "Name Required" };
        break;
  
      case "Email Required":
        code = 422;
        message = "Emai Required: Your email is required to perform this action";
        error = { email: "Email Required" };
        break;
  
      case "Invalid Email":
        code = 422;
        message = "Emai Invalid: Your email is invalid";
        error = { email: "Email Invalid" };
        break;
  
      case "Password Required":
        code = 422;
        message =
          "Password Required: Your Password is required to perform this action";
        error = { password: "Password Required" };
        break;
  
      case "Login Failed":
        code = 401;
        message = "Login failed, email or password is wrong";
        break;
      
        case "Email not Registered":
        code = 401;
        message = "Login failed, email is not registered";
        break;
  
      default:
        code = 500;
        message = "Internal server error";
        break;
    }
  
    res.status(code).json({ success: false, message, error });
  };
