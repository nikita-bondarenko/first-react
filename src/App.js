import React, {useEffect, useMemo, useRef, useState} from 'react'
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./components/API/PostService";
import MyLoader from "./components/UI/loader/MyLoader";
import {useFetching} from "./hooks/useFetching";
import {getPageCount} from "./utils/pages";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)

    const [page, setPage] = useState(1)

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const res = await PostService.getAll()
        setPosts(res.data)
        const totalCount = Number(res.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit))
    })

    console.log(totalPages)

    useEffect(() => {
        fetchPosts()
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <div>

                <PostFilter filter={filter} setFilter={setFilter}></PostFilter>
                {postError &&
                    <h1>Произошла ошибка {postError}</h1>}
                {isPostLoading
                    ?
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><MyLoader></MyLoader></div>
                    : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про js"/>

                }
            </div>
        </div>
    );
}

export default App;
