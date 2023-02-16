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
                    let newPostData = getInHTMLFormate(data.data.post, data.data.image);
                    console.log(data);
                    $("#home-post-container").prepend(newPostData);
                    deletePost($(" .delete-post-button", newPostData));
                    console.log("call came back with delete");
                }, error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    
    let getInHTMLFormate = function(post, image){  
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
                    <input type="text" id = "comment-input">
                    <button class = "post-content-button">Add comment</button>
                </div>
                <a href="">
                    Show all comments
                </a>
                <a href="/post/deletePost/${post._id}" class = "delete-post-button">
                    Delete Post
                </a>
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
}

/*

let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: "/post/create",
                data: newPostForm.serialize(),
                success : function(data){
                    let newPost = createPostDOM(data.data.post);
                    $("#all-posts>ul").prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    
                    // Enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })

        });
    }

        let createPostDOM =  function(post){
                return $(`<li id = "post-${post._id}">
                <p>Posted bi ${post.user.name}</p>
        
                <small>
                    <a href="/post/deletePost/${post._id}" class="delete-post-button">Delete Post</a>
                </small>
        
                <p>${post.content}</p>
                <br>

                <small> 
                            
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                        0 Likes
                    </a>
            
                </small>
                            
                <div class = "post-comments">
                    
                        <form action="/comments/create" method="POST" id="post-${post._id}-comments-form">
                            <input type="text" name = "content" placeholder="Add your comment...">
                            <input type="hidden" name = "post"  value ="${post._id}">
                            <input type="submit" value = "Add Comment">
                        </form>
                    
                    <div id = "post-comments-list">
                        <ul id="comment-${ post._id}">
                            
                        </ul>
                    </div>           
                </div>
            
            </li>`);
        }

    
    let deletePost = function(deleteLink){
        
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

    let convertPostsToAjax = function(){
        $('#all-posts>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }

    //createPost();
    convertPostsToAjax();
*/