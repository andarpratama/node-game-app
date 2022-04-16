module.exports = (err, req, res, next) => {
    let code;
    let name = err.name;
    let message;
    let error;
  
    switch (name) {

      case "Failed_created":
        code = 500;
        message = "Failed create..";
        break;
  
      case "Failed_updated":
        code = 500;
        message = "Failed update..";
        break;
  
      case "Failed_deleted":
        code = 500;
        message = "Failed delete..";
        break;
  
      case "Failed_get_all":
        code = 500;
        message = "Failed get all..";
        break;
  
      case "Failed_get_detail":
        code = 500;
        message = "Failed get detail..";
        break;
  
      case "Failed_attack":
        code = 500;
        message = "Failed attack another user..";
        break;
  
      case "Failed_attack_soldier_not_enough":
        code = 500;
        message = "Soldier is not enough..";
        break;
  
      case "Enemy_soldier_not_enough":
        code = 500;
        message = "Cant attack, enemy soldier less than 50..";
        break;
  
      case "Your_soldiers_greater":
        code = 500;
        message = "Your soldiers greater than enemy soldier..";
        break;
  
      default:
        code = 500;
        message = "Internal server error";
        break;
    }
  
    res.status(code).json({ success: false, message, error });
  };
  