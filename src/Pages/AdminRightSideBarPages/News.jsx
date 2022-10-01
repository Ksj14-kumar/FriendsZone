import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios';
import PostCard from '../../Components/ProfilePageComponent/PostCard';
import NewsTypeTitle from "../../Components/News/newsType"
import { Image } from "@material-tailwind/react"
import Circler from "../../Loader/CircleLoader"
import InternetDetection from '../../Components/InternetDetection';
const IdArray = [13, 14, 16, 24, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 15, 17, 18, 19, 20, 21, 22, 23, 25, 26]
function News({ theme, socket }) {
    const [News, setNews] = useState([])
    const [query, setQuery] = useState({ q: "in", id: 0 })
    const [loading, setLoading] = useState(false)
    const [newsName, setNewsName] = useState("")
    const [boolean, setBoolean] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    useEffect(() => {
        async function loadNews() {
            setLoading(true)
            const res = await Axios({
                url: `${process.env.REACT_APP_API_BACKENDURL}/api/v1/news/newsORG`,
                method: "POST",
                data: { query, searchValue },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("uuid")
                }
            })
            setNews(res.data.data)
            setSearchValue("")
            setLoading(false)
        }
        boolean && loadNews()
    }, [query, boolean])
    //get the news
    function getNewsHandle(value) {
        setQuery({ q: "", id: value })
    }
    return (
        <>
            <InternetDetection />
            <div className={`${theme ? "bg-[#0e0e0e]" : "bg-[#e1e1e1]"}  mt-[0rem] pt-[4rem] flex items-center min-h-screen flex-col`}>
                <div className="filter_post w-full flex justify-center  ">
                    <div className={`sea py-2 ${theme ? "bg-[#222222]" : "bg-[#e1e1e1]"}  w-full px-6 md:ml-[16rem]`}>
                        <div className="search_section w-full mb-2">
                            <input type="search" className={`filter_post_input py-3 w-full rounded-md  px-2 focus:outline-none font-serif border-[1px] border-solid border-[#e3e3e3] tracking-wider  ${theme ? "bg-[#3b3b3b] text-[#fff] placeholder:text-[#fff]" : "bg-[#fff] text-[#2f2f2f] placeholder:text-[#b8b8b8]"}`} placeholder="e.g. timesofindia.com, movies"
                                defaultValue={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value)
                                }}
                            />
                            <button className="btn btn-block focus:outline-none mt-4 font-serif text-[1.1rem] tracking-wider bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r"
                                disabled={searchValue.length ? false : true}
                                onClick={() => {
                                    setQuery({})
                                    setNewsName("")
                                    setBoolean(true)
                                }}
                            >Search</button>
                        </div>
                        <div className="divider bg-[#b1b1b1] h-[1px]"></div>
                        <section className="news_type flex flex-wrap justify-center">
                            {
                                NewsTypeTitle.map((item) => {
                                    return (
                                        <>
                                            <p className={`text-[1.2rem]  font-serif rounded-md  py-3 ${query.id === item.id ? "bg-[#d50622] outline outline-[3px] outline-solid outline-[#0a24ef] outline-offset-2 text-[#fff]" : "bg-[#242f4a]"} drop-shadow-lg cursor-pointer text-[#fff] mr-2 mb-2 tracking-wider flex flex-col justify-between px-3 items-center`}
                                                onClick={() => {
                                                    getNewsHandle(item.id)
                                                    setNewsName(item.title)
                                                    setBoolean(true)
                                                    setSearchValue("")
                                                }}
                                            >
                                                <Image src={item.image} rounded={false} className={` ${IdArray.includes(item.id) ? "h-[3.5rem] mb-1" : "w-[3rem] h-[2.1rem]"}`} />
                                                {item.title}
                                            </p>
                                        </>
                                    )
                                })
                            }
                        </section>
                        {newsName && <section className="news_name text-center w-full py-2 text-[1.5rem] tracking-wider font-serif font-semibold italic bg-gradient-to-r from-indigo-500 rounded-sm">
                            {newsName}
                        </section>}
                    </div>
                </div>
                <div className={`inner ${theme ? "bg-[#0e0e0e]" : "bg-[#e1e1e1]"} p-4 gap-y-2 md:ml-[16rem] flex flex-col items-center`}>
                    {
                        loading ? <Loader /> : News.length > 0 && News.map((item, index) => {
                            return (
                                <>
                                    <PostCard item={item} key={index} socket={socket} theme={theme} />
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default News = React.memo(News)
function Loader() {
    return (
        <Circler height={80} width={80} color="#5f0303" />
    )
}