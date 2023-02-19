{
    console.log("hey all");

    let createPost = function(){
        let submitButton = $("#new-post-form");
        submitButton.submit(function(event){
            event.preventDefault();

            $.ajax({
                type : "post",
                url : "/post/create",
                data : submitButton.serialize(),
                success : function(data){
                    let newPostData = getInHTMLFormate(data.data.post, data.data.image, data.data.currentPost);
                    console.log(data);
                    $("#home-post-container").prepend(newPostData);
                    deletePost($(" .delete-post-button", newPostData));
                    console.log("call came back with delete");
                    commentAjaxCall();
                    
                }, error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    
    let getInHTMLFormate = function(post, image, currentPost){  
        console.log("return post with html");
        return $(`<span id = "post-${post._id}">
        <div id = "post-container">
            <div id = "user-name-heading">
            
                <div id = "post-image-container">
                    <span id = "post-heading-profile-img">
                    <img src="${check(post.user.avatar, image)}" id = "post-user-profile" alt="profile-page"></img>    
                    </span>
                </div>
                
                <p id = "post-user-name">${post.user.name}</p>
            </div>
            <div id = "post-content">
                <p> ${post.content}</p>
            </div>
            <div id = "like-comment-section">
                <button class = "post-content-button">128 Like</button>
                <div id = "comment-div">
                    <form action="/comments/create" method="POST" id="submit-form" class = "comment-form">
                        <input type="text" name = "content" id = "comment-input" placeholder="Add your comment...">
                        <input type="hidden" name = "post"  value ="${currentPost}">
                        <input type="submit" class = "post-content-button add-comment-button" value = "Add Comment">
                    </form>
                </div>
                <a href="/comments/display/${currentPost}" id = "show-post-comment">
                    Show all comments
                </a>
                <a href="/post/deletePost/${currentPost}" class = "delete-post-button">
                    Delete Post
                </a>
            </div>
            <div id = "user-only-comment">
            
            </div>
        </div>
    </span>
    `);
    }
    let deletePost = function(deleteLink){
        console.log("deletelink received");
        $(deleteLink).click(function(e){
            
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    let convertPostToAJAX = function(){
        $("#home-post-container>span").each(function(){
            let currPost = $(this);
            let deleteButton = $(' .delete-post-button', currPost);
            deletePost(deleteButton);

        });
    }
    createPost();
    convertPostToAJAX();
    function check(data, image){
        if(data) return data;
        return image;
    }    
    //******Comment Data******** 
    console.log("in Comment");
    let commentAjaxCall = function(){
        let onFormSubmition = $("#submit-form");
        onFormSubmition.submit(function(event){
            event.preventDefault();
            $.ajax({
                type : "post",
                url : "/comments/create",
                data : onFormSubmition.serialize(),
                success : function(data){
                    console.log("comment has been made");  
                    let newComment = createComment(data.data.comment);
                    $("#user-only-comment").prepend(newComment);
                }, error : function(err){
                    console.log(err);
                }
            });
        });
    }
    
    let createComment = function(comment){
        return $(`<div id = "onPost-comment-container">
                    <div id = "commented-user-name" class = "box-margin">
                    <p id ="comment-user-name">${comment.user.name}</p>
                    </div>
                    <div id = "onPost-comment-content" class = "box-margin">
                    <p>${comment.content}</p>
                    </div>
                </div>`);
    }
    commentAjaxCall();
    //***** */
    

// display comments ajax call

   

}

