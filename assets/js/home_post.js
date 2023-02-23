
console.log("hey all");
        let showPost = function(){
         let submitButton = $("#new-post-form");
           submitButton.submit(async function(event){
            event.preventDefault();
            // console.log("prevented");

            await $.ajax({
                type : "post",
                url : "/post/create",
                data : submitButton.serialize(),
                success : function(data){
                    let newPostData = getInHTMLFormate(data.data.post, data.data.image, data.data.currentPost);
                    console.log(data);
                    $("#home-post-container").prepend(newPostData);
                    deletePost($(" .delete-post-button", newPostData));
                    convertPostToAJAX();
                    showComment();
                }, error : function(error){
                    console.log(error.responseText);
                }
            });
        });

    
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
               
                <a href="/comments/display/${currentPost}" id = "show-post-comment">
                   Comments
                </a>
                <a href="/post/deletePost/${currentPost}" class = "delete-post-button">
                    Delete Post
                </a>
            </div>
            <div id = "add-comment-form"></div>
            <div id = "user-only-comment">
            
            </div>
        </div>
    </span>
    `);
    }
    let deletePost = async function(deleteLink){
        console.log("deletelink received");
       await $(deleteLink).click(async function(e){
            
            e.preventDefault();
            
            await $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.postId}`).remove();
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
    function check(data, image){
        if(data) return data;
        return image;
    }   

}
showPost();
  

    


