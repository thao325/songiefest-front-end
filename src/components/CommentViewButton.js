// view a comment 
import React from "react";
import '../style-sheets/CommentViewButton.css'

function CommentViewButton ({musicPostId}) {

  return(
    <div className='button'>
      <p> View 8 Comments</p>
      {musicPostId}
    </div>
    
  )
}

export default CommentViewButton;