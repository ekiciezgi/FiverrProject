import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Reviews from "../../../components/reviews/Reviews";

function Gig() {

    const { id } = useParams();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['gig'],
        queryFn: () =>
            newRequest.get(`/gigs/single/${id}`).then(res => {
                return res.data
            })
    })

    const { isLoadingUser, errorUser, dataUser, refetchUser } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            newRequest.get(`/users/${id}`).then((res) => {
                return res.data
            })
    })
    return (
        <div className="gig">
            {isLoading ? ("loading") : error ? ("Someting went wrong") : <div className="container">
                <div className="left">
                    <span className="breadcrumbs">Fiverr {">"}  Graphics & Design {">"} </span>
                    <h1>{data.title}</h1>
                    {isLoadingUser ? ("loading") : error ? ("Someting went wrong") : <div className="user">
                        <img
                            className="pp"
                            src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                        />
                        <span>Anna Bell</span>
                        {!isNaN(data.totalStars / data.starNumber) && (
                            <div className="stars">
                                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                                    <img src="/img/star.png" alt="" key={i} />
                                ))}
                                <span>{Math.round(data.totalStars / data.starNumber)}</span>
                            </div>)}
                    </div>}
                    <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                        {data.images.map((img) => (
                            <img key={img} src={img} alt="" />
                        ))}
                    </Slider>
                    <h2>About This Gig</h2>
                    <p>
                        {data.desc}
                    </p>
                    {isLoading ? ("loading") : errorUser ? ("Someting went wrong") : <div className="seller">
                        <h2>About The Seller</h2>
                        <div className="user">
                            <img
                                src={dataUser && dataUser.img ? dataUser.img : "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                                alt=""
                            />
                            <div className="info">
                                <span>Anna Bell</span>
                                {!isNaN(data.totalStars / data.starNumber) && (
                                    <div className="stars">
                                        {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                                            <img src="/img/star.png" alt="" key={i} />
                                        ))}
                                        <span>{Math.round(data.totalStars / data.starNumber)}</span>
                                    </div>)}
                                <button>Contact Me</button>
                            </div>
                        </div>
                        <div className="box">
                            <div className="items">
                                <div className="item">
                                    <span className="title">From</span>
                                    <span className="desc">USA</span>
                                </div>
                                <div className="item">
                                    <span className="title">Member since</span>
                                    <span className="desc">Aug 2022</span>
                                </div>
                                <div className="item">
                                    <span className="title">Avg. response time</span>
                                    <span className="desc">4 hours</span>
                                </div>
                                <div className="item">
                                    <span className="title">Last delivery</span>
                                    <span className="desc">1 day</span>
                                </div>
                                <div className="item">
                                    <span className="title">Languages</span>
                                    <span className="desc">English</span>
                                </div>
                            </div>
                            <hr />
                            <p>
                                My name is Anna, I enjoy creating AI generated art in my spare
                                time. I have a lot of experience using the AI program and that
                                means I know what to prompt the AI with to get a great and
                                incredibly detailed result.
                            </p>
                        </div>
                    </div>}
                    <Reviews gigId={id}></Reviews>
                </div>
                <div className="right">
                    <div className="price">
                        <h3>{data.shortTitle}</h3>
                        <h2>{data.price}</h2>
                    </div>
                    <p>
                        {data.shortDesc}
                    </p>
                    <div className="details">
                        <div className="item">
                            <img src="/img/clock.png" alt="" />
                            <span>{data.deliveryDate}</span>
                        </div>
                        <div className="item">
                            <img src="/img/recycle.png" alt="" />
                            <span>{data.revisionNumber}</span>
                        </div>
                    </div>
                    <div className="features">
                        {data.features.map((feature) => {
                            <div className="item" key={feature}>
                                <img src="/img/greencheck.png" alt="" />
                                <span>{feature}</span>
                            </div>
                        })}
                    </div>
                    <Link to={`/pay/${id}`}>
                        <button>Continue</button>
                    </Link>

                </div>
            </div>}
        </div>
    );
}

export default Gig;
