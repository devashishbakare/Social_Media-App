{

    var showComment = function(){
        console.log("in display comment function");
        let isCommnetLoadedBefore = 0;
        $("#show-post-comment").click(async function(e){
            console.log("in display comment function");
            e.preventDefault();
            console.log("prevented");
                await $.ajax({
                    type : "GET",
                    url : $("#show-post-comment").prop("href"),
                    success : function(data){
                        let comment = data.data.comments;
                        let post = data.data.post;
                        console.log("this post "+post._id);

                        let addComment =  $("#add-comment-form");
                        let userComment = $("#user-only-comment");
                        
                        if(addComment.is(":hidden") && userComment.is(":hidden")){
                            addComment.show();
                            userComment.show();
                        }
                        else{
                            addComment.css("height", "60px");
                            if(isCommnetLoadedBefore == 0){
                                addComment.append(getCommentBox(post._id));
                                for(let i = 0; i < comment.length; i++){
                                    userComment.append(getCommentInHTML(comment[i]));
                                }
                                isCommnetLoadedBefore = 1;
                            }
                        }
                        submitForm();
                        closeCommentDiv();
                    }, error : function(err){
                        console.log("ajax success failed!", err);
                    }
                });
        });
    }
        
    
    
    

    //88
   var submitForm = function(){
    let isCommentdisplayed = 0;
        
    $("#submit-form").submit(async function(event){
        console.log("inside ajax submition");
        event.preventDefault();
        console.log("prevent submit");
        await $.ajax({
            type : "post",
            url : "/comments/create",
            data : $("#submit-form").serialize(),
            success : function(data){
                console.log("comment has been made");  
                let comment = data.data.comment;
               
                $("#user-only-comment").prepend(getCommentInHTML(comment));
                
            }, error : function(err){
                console.log(err);
            }
        });
    });
   }

  
    var closeCommentDiv = function(){
        let closeLink = $("#close-comment");
        closeLink.click(async function(event){
            event.preventDefault();
            await $.ajax({
                type : "GET",
                url : closeLink.prop("href"),
                success : function(data){
                    $("#user-only-comment").hide();
                    $("#add-comment-form").hide();
                    console.log("yes closed!");
                    
                }, error : function(err){
                    console.log("Error while closing comments "+err);
                }
            });
        });
    }

    //88

    let getCommentBox = function(currentPost){
        return $(`<div id = "comment-div">
                    <form action="/comments/create" method="POST" id="submit-form" class = "comment-form">
                        <input type="text" name = "content" id = "comment-input" placeholder="Add your comment...">
                        <input type="hidden" name = "post"  value ="${currentPost}">
                        <input type="submit" class = "post-content-button add-comment-button" value = "Add Comment">
                    </form>
                    <div>
                        <a href = "/comments/close/${currentPost}" id = "close-comment"> Close </a>
                    </div>
                
                </div>`);
    }

    let getCommentInHTML = function(postComment){
        
        return $(`<div id = "onPost-comment-container">
                    <div id = "commented-user-name" class = "box-margin">
                    <p id ="comment-user-name">${postComment.user.name}</p>
                    </div>
                    <div id = "onPost-comment-content" class = "box-margin">
                    <p>${postComment.content}</p>
                    </div>
                </div>`);
    }
    
    showComment();
}