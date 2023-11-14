function Home() {
    return (
        <>
            <div className="container">
                <h1 className="text-center mb-4">welcome to api challenge</h1>
                <h6 className="text-center mb-4">you can signUp or logIn</h6>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button class="btn btn-primary" type="button">LogIn</button>
                    <button class="btn btn-primary" type="button">SignUp</button>
                </div>
            </div>
        </>
    )
}
export default Home