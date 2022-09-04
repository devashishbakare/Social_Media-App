{
    console.log("hello all");
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

                },
                error: function(error){
                    console.log(error.responseText);
                }
            })

        });

        let createPostDOM =  function(post){
                return $(`<li id = "post-${post._id}">
                <p>Posted bi ${post.user.name}</p>
        
                <small>
                    <a href="/post/deletePost/${post._id}" class = "delete-post-button">Delete Post</a>
                </small>
        
                <p>${post.content}</p>
                            
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

    createPost();
    convertPostsToAjax();
}