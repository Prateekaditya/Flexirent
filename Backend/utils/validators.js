const checkEmail = (email) => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
  };
  
  const checkPass = (pass) => {
    const passPattern = /^(?=.*\d).{10,}$/;
    return passPattern.test(pass);
  };
  module.exports = {
    checkEmail,
    checkPass,
  };