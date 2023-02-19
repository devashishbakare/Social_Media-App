{
    //display comments
    let displayComments = function(){
        console.log("in display comment function");
        $("#show-post-comment").click(function(event){
            console.log("in display comment function");
            event.preventDefault();
                $.ajax({
                    type : "GET",
                    url : $("#show-post-comment").prop("href"),
                    success : function(data){
                        let comment = data.data.comments;
                        for(let i = 0; i < comment.length; i++){
                            $("#user-only-comment").append(getCommentInHTML(comment[i]));
                        }
                    }, error : function(err){
                        console.log("ajax success failed!", err);
                    }
                });
        });
    }

    let getCommentInHTML = function(postComment){
        console.log("call from creation comement and send!");
        console.log(postComment.content);
        
        return $(`<div id = "onPost-comment-container">
                    <div id = "commented-user-name" class = "box-margin">
                    <p id ="comment-user-name">${postComment.user.name}</p>
                    </div>
                    <div id = "onPost-comment-content" class = "box-margin">
                    <p>${postComment.content}</p>
                    </div>
                </div>`);
    }


    displayComments();
    
}

