import { CalendarViewDay, CommentOutlined, Create, EventNote, Image, MoreHoriz, SendOutlined, ShareOutlined, Subscriptions, ThumbUpAltOutlined } from '@material-ui/icons'
import InputOption from './InputOption';
import './Main.css'
import styled from 'styled-components';
import PostModal from './PostModal';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getArticlesAPI } from '../actions';
import ReactPlayer from 'react-player';

const Main = (props) => {
    const [showModal, setShowModal] = useState("close");
    useEffect(() => {
        props.getArticles();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }
    };

    return (
        <>
            <div className='feed'>
                <div className="feed_inputContainer">
                    <div className='inner'>
                        {props.user && props.user.photoURL ?
                            (<img src={props.user.photoURL} alt="" />)
                            :
                            (<img src="/images/user.svg" alt="" />)
                        }
                        <div className="feed_input">
                            <Create />
                            <form>
                                <input onClick={handleClick} disabled={props.loading ? true : false} placeholder='Start a post' type="text" />
                                <button type='submit'>Send</button>
                            </form>
                        </div>
                    </div>
                    <div className="feed_inputOptions">
                        <InputOption Icon={Image} title="Photo" color="#70B5f9" />
                        <InputOption Icon={Subscriptions} title="Video" color="#E7A33E" />
                        <InputOption Icon={EventNote} title="Event" color="#C0CBCD" />
                        <InputOption Icon={CalendarViewDay} title="Article" color="#7FC15E" />
                    </div>
                </div>
                {
                    props.articles.length === 0 ?
                        <p>There are no articles</p>
                        :
                        <Content>
                            {
                                props.loading && <img src='./images/loader.gif' alt='' />
                            }
                            {props.articles.length > 0 &&
                                props.articles.map((article, key) => (
                                    <Article key={key}>
                                        <SharedActor>
                                            <a>
                                                <img src={article.actor.image} alt="/images/user.svg" />
                                                <div>
                                                    <span>{article.actor.title}</span>
                                                    <span>{article.actor.description}</span>
                                                    <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                                                </div>
                                            </a>
                                            <button>
                                                <MoreHoriz />
                                            </button>
                                        </SharedActor>
                                        <Description>{article.description}</Description>
                                        <SharedImg>
                                            <a>
                                                {
                                                    !article.sharedImg && article.video ?
                                                        <ReactPlayer width={'100%'} url={article.video} />
                                                        :
                                                        article.sharedImg && <img src={article.sharedImg} />
                                                }
                                            </a>
                                        </SharedImg>
                                        <SocialCounts>
                                            <li>
                                                <button>
                                                    <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                                                    <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="" />
                                                    <span>75</span>
                                                </button>
                                            </li>
                                            <li>
                                                <a>{article.comments}</a>
                                            </li>
                                        </SocialCounts>
                                        <SocialActions>
                                            <button>
                                                <div><ThumbUpAltOutlined style={{ color: "#70B5f9" }} /></div>
                                                <span>Like</span>
                                            </button>
                                            <button>
                                                <div><CommentOutlined style={{ color: "#70B5f9" }} /></div>
                                                <span>Comment</span>
                                            </button>
                                            <button>
                                                <div><ShareOutlined style={{ color: "#70B5f9" }} /></div>
                                                <span>Share</span>
                                            </button>
                                            <button>
                                                <div><SendOutlined style={{ color: "#70B5f9" }} /></div>
                                                <span>Send</span>
                                            </button>
                                        </SocialActions>
                                    </Article>
                                ))}
                        </Content>
                }
                <PostModal showModal={showModal} handleClick={handleClick} />
            </div>
        </>
    )
}

const commonCard = styled.div`
    text-align:center;
    overflow: hidden;
    margin-bottom:8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow:0 0 0 1px rgb( 0 0 0 / 15%), 0 0 0 rgb( 0 0 0 / 20%);
`;
const Article = styled(commonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`;
const SharedActor = styled.div`   
    padding-right:40px;
    flex-wrap:nowrap;
    padding:12px 16px 0;
    margin-bottom:8px;
    align-items:center;
    display:flex;
    a{
        margin-right:12px;
        flex-grow:1;
        overflow: hidden;
        display: flex;
        text-decoration:none;

        img{
            width:48px;
            height:48px;
        }
        & > div{
            display:flex;
            flex-direction:column;
            flex-grow:1;
            flex-basis:0;
            margin-left:8px;
            overflow:hidden;
            span{
                text-align:left;
                &:first-child{
                    font-size:14px;
                    font-weight:700;
                    color:rgba(0,0,0,1);
                }
                &:nth-child(n+1){
                    font-size:12px;
                    color:rgba(0,0,0,0.6);
                }
            }
        }
    }
    button{
        position: absolute;
        right: 12px;
        top:0;
        background: transparent;
        border:none;
        outline:none;
    }
`;
const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0 ,0,0,0.9);
    font-size:14px;
    text-align:left;
`;
const SharedImg = styled.div`
    margin-top:8px;
    width: 100%;
    display: block;
    position: relative;
    background-color:#f9fafb ;
    img{
        object-fit:contain;
        width:100%;
        height:100%;
    }
`;
const SocialCounts = styled.ul`
    line-height:1.3;
    display: flex;
    align-items:center;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style:none;
    li{
        margin-right:5px;
        font-size:12px;
        button{
            display:flex;
            border:none;
            background-color:white ;
        }
    }
`;
const SocialActions = styled.div`
    align-items:center;
    display:flex;
    justify-content:flex-start;
    margin:0;
    min-height:40px;
    padding:4px 8px;
    button{
        display: inline-flex;
        align-items:center;
        padding: 8px;
        background-color:whitesmoke;
        color:#0a66c2;
        border:none;
        background-color:white;
        @media(min-width:768px){
            margin-left:1px;
        }
        &:active{
            background-color:white ;
        }
    }
`;
const Content = styled.div`
    text-align:center;
    &>img{
        width:30px;
    }
`;

const mapStateToProps = (state) => {
    return {
        loading: state.articleState.loading,
        user: state.userState.user,
        articles: state.articleState.articles,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);