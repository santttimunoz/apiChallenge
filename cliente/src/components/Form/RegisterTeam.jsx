export default function RegisterTeam() {
    return (
        <>
            <div className="container ">
                <form>                                                          
                        <div className="col-12 mb-3 me-2">
                            <label for="exampleInputEmail1" className="form-label">teamName</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='enter teamName'/>
                        </div>
                        <div className="col-12 mb-3">
                        <label for="exampleInputPassword1" className="form-label">teamMembers</label>
                           <select name="" id="" className='form-select '>                            
                            <option selected value="">op1</option>
                            <option value="">op2</option>
                           </select>
                        </div>                                              
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
        </>
    )
}