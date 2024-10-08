import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const getTimeAgo = (date) => {
	const postDate = new Date(date);
	const currentDate = new Date();
	const timeDiff = Math.abs(currentDate - postDate);

	const seconds = Math.floor(timeDiff / 1000);
	const minutes = Math.floor(timeDiff / (1000 * 60));
	const hours = Math.floor(timeDiff / (1000 * 60 * 60));
	const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

	if (seconds < 60) {
		return `${seconds} seconds ago`;
	} else if (minutes < 60) {
		return `${minutes} minutes ago`;
	} else if (hours < 24) {
		return `${hours} hours ago`;
	} else if (days < 7) {
		return `${days} days ago`;
	} else {
		return `${weeks} weeks ago`;
	}
};

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {

		actions.getAllPosts()

	}, [store.allPosts.length])



	return (
		<div className="text-center mt-5">

			<button type="button" className="btn btn-primary my-5 " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				Make a post!
			</button>


			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header text-center">
							<h1 className="modal-title fs-5 text-center" id="staticBackdropLabel">Make a post!!</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form className="form-container">
								<div className="mb-3">
									<label for="exampleInputEmail1" className="form-label">Email address</label>
									<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
									<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
								</div>
								<div className="mb-3">
									<label for="exampleInputPassword1" className="form-label">Password</label>
									<input type="password" className="form-control" id="exampleInputPassword1"></input>
								</div>
								<div className="mb-3 form-check">
									<input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
									<label className="form-check-label" for="exampleCheck1">Check me out</label>
								</div>
								<button type="submit" className="btn btn-primary">Submit</button>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Understood</button>
						</div>
					</div>
				</div>
			</div>


			{store.allPosts.length == 0 ? "Loading" : store.allPost !== "no post in db" || store.allPost !== "Token expired" ? "No posts yet :(" : store.allPosts.map((post, index) => (
				<div className="card mx-auto mb-4" style={{ maxWidth: "600px" }} key={index}>
					<div className="card-header d-flex align-items-center">
						<img
							src='https://fastly.picsum.photos/id/228/200/300.jpg?hmac=A6oUMz6rMYY00q0GJfUDf_sU2uPTrqbUHVQykZQtZDU'
							alt="Author avatar"
							className="rounded-circle mr-3"
							width="50"
							height="50"
						/>
						<div>
							<h5 className="mb-0">{post.author}</h5>
							<small className="text-muted">{post.location}</small>
						</div>
					</div>
					<img src={post.image} className="card-img-top" alt="Post" />
					<button className="btn btn-primary btn-sm">Like</button>
					<div className="card-body">
						<div className="likes-container">{post.likes.length == 0 ? "No one likes this" : post.likes}</div>
						<p className="card-text">{post.message}</p>
						<p className="card-text">
							<small className="text-muted">{getTimeAgo(post.created_at)}</small>
						</p>

					</div>
				</div>
			))}



		</div>
	)
}