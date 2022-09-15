const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log("new mailers commnet", comment);

    let htmlString = nodeMailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs');
    
    nodeMailer.transporter.sendMail({
        from: 'devashishbakare@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: "New comment on your post!", // Subject line
        html: htmlString, // html body
    }, (err, info) => {
        if(err){
            console.log("error in sending mail", err);
            return;
        }
        //console.log('massage has been sent ', info);
        return;
    });
}