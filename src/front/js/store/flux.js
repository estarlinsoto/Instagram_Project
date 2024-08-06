const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			allPosts:'',
			loginRes: '',
			newUser: ',',
			newUserRes: '',
	
		},
		actions: {

			logIn: async (userName, password) => {
				const store = getStore()
				const actions = getActions()
				const opts = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						username: userName,
						password: password,
					}),
				};

				await fetch(process.env.BACKEND_URL + "/api/login", opts)
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else if (res.status == 400) {
							actions.getUserForPayment(userEmail)
							setStore({ store: store.loginRes = "username and password are required." })
							throw Error(res.statusText)
						} else if (res.status == 401) {
							setStore({ store: store.loginRes = "Incorrect password" })
							throw Error(res.statusText)
						} else if (res.status == 404) {
							setStore({ store: store.loginRes = "username don't exist" })
							throw Error(res.statusText)
						}
					})
					.then((data) => {
						sessionStorage.setItem("access_token", data.access_token);

						setStore({ store: store.loginRes = data.msg })
					})
			},
			createNewUser: async (newUser) => {
				try {
					const store = getStore()
					const actions = getActions()
					setStore({ store: store.newUser = newUser })
					setStore({ store: store.newUserRes = "" })

					await fetch(process.env.BACKEND_URL + "/api/register", {
						method: "POST",
						headers: {
							"Content-type": "application/json",
						},

						body: JSON.stringify(newUser)
					})
						.then((res) => {
							if (res.status == 200) {
								return res.json()
							} if (res.status == 409) {
								setStore({ store: store.newUserRes = "username already exists." })
								throw Error(res.statusText)
							}
						})
						.then((json) => {
							setStore({ store: store.newUserRes = "success" })
					

						})

				} catch (error) {
					console.log("Create user function error==", error)
				}

			},
			getAllPosts: async () => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/get_all_posts",{
						headers: {
							Authorization: `Bearer ${sessionStorage.access_token}`
						}}
					)
					
					const data = await resp.json()
					setStore({ allPosts: data })
					console.log(data)
					
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
