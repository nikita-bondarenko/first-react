import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const PostList = ({posts, title, remove}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        nodeRef={post.nodeRef}
                        timeout={500}
                        className="post">
                        <PostItem ref={post.nodeRef} remove={remove} number={index + 1} post={post}></PostItem>
                    </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    );
};

export default PostList;