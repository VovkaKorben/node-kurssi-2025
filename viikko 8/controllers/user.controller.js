const registerUser = (req, res) => {
    console.log(req.body);
    res.render('register', {
        message: " Lomake lähetetty!"
    });

}

export default registerUser;
